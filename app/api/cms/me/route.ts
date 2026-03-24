import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const isAdmin = await verifySession(req.headers.get('cookie'));
  if (!isAdmin) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  return NextResponse.json({ admin: true });
}
