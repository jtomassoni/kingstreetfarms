import { jwtVerify } from 'jose';

export async function verifySession(cookieHeader: string | null): Promise<boolean> {
  const match = /admin_session=([^;]+)/.exec(cookieHeader || '');
  if (!match) return false;
  const secret = process.env.SESSION_SECRET;
  if (!secret) return false;
  try {
    await jwtVerify(match[1], new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}
