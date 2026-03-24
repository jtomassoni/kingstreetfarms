import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { ensureSchema } from '@/lib/schema';

export async function GET(req: NextRequest) {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  await ensureSchema(sql);
  const isAdmin = await verifySession(req.headers.get('cookie'));
  try {
    const sections = await sql`
      SELECT id, name, sort_order, is_active, created_at, updated_at
      FROM product_sections
      ORDER BY sort_order ASC, name ASC
    `;
    const out = (sections as Record<string, unknown>[]).map((s) => ({ id: s.id, name: s.name, sort_order: s.sort_order, is_active: !!s.is_active, created_at: s.created_at, updated_at: s.updated_at }));
    if (!isAdmin) return NextResponse.json(out.filter((s) => s.is_active));
    return NextResponse.json(out);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifySession(req.headers.get('cookie')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  await ensureSchema(sql);
  const body = await req.json().catch(() => ({}));
  const { name, sort_order = 0, is_active = true } = body;
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }
  try {
    const [row] = await sql`
      INSERT INTO product_sections (name, sort_order, is_active, updated_at)
      VALUES (${name.trim()}, ${Number(sort_order) || 0}, ${!!is_active}, NOW())
      RETURNING id, name, sort_order, is_active, created_at, updated_at
    `;
    return NextResponse.json(row, { status: 201 });
  } catch (err: unknown) {
    if ((err as { code?: string }).code === '23505') return NextResponse.json({ error: 'Section name already exists' }, { status: 409 });
    console.error(err);
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await verifySession(req.headers.get('cookie')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  if (!id || isNaN(id)) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  const { name, sort_order, is_active } = body;
  try {
    const [existing] = await sql`SELECT * FROM product_sections WHERE id = ${id}`;
    if (!existing) return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    const ex = existing as Record<string, unknown>;
    const newName = typeof name === 'string' && name.trim() ? name.trim() : String(ex.name ?? '');
    const newSortOrder = typeof sort_order === 'number' ? sort_order : Number(ex.sort_order) ?? 0;
    const newIsActive = typeof is_active === 'boolean' ? is_active : !!ex.is_active;
    const [row] = await sql`
      UPDATE product_sections SET name = ${newName}, sort_order = ${newSortOrder}, is_active = ${newIsActive}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, sort_order, is_active, created_at, updated_at
    `;
    return NextResponse.json(row);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await verifySession(req.headers.get('cookie')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get('id') || '', 10);
  if (!id || isNaN(id)) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  try {
    await sql`DELETE FROM products WHERE section_id = ${id}`;
    const result = await sql`DELETE FROM product_sections WHERE id = ${id} RETURNING id`;
    if (!result.length) return NextResponse.json({ error: 'Section not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}
