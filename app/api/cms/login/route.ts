import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

function parseCredentials(env: string | undefined): { username: string; password: string }[] {
  if (!env) return [];
  try {
    const p = JSON.parse(env);
    if (Array.isArray(p)) return p.filter((c): c is { username: string; password: string } => !!c?.username && !!c?.password);
    if (p?.username && p?.password) return [p];
  } catch {
    return env.split(',').map((pair) => {
      const [u, p] = pair.split(':').map((s) => s?.trim());
      return u && p ? { username: u, password: p } : null;
    }).filter((c): c is { username: string; password: string } => !!c);
  }
  return [];
}

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  const body = await req.json().catch(() => ({}));
  const { username, password } = body;
  const creds = [...parseCredentials(process.env.ADMIN_USER), ...parseCredentials(process.env.ADMIN_USERS)];
  if (!username || !password || !creds.some((c) => c.username === username && c.password === password)) {
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }
  const secret = process.env.SESSION_SECRET;
  if (!secret) return NextResponse.json({ error: 'SESSION_SECRET not set' }, { status: 500 });
  const token = await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(secret));
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_session', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 86400,
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}
