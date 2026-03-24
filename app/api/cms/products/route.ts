import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { ensureSchema } from '@/lib/schema';

function serializeProduct(r: Record<string, unknown>) {
  return {
    id: r.id,
    section_id: r.section_id,
    section_name: r.section_name,
    name: r.name,
    description: r.description || '',
    price: parseFloat(String(r.price)),
    depositPrice: parseFloat(String(r.deposit_price)),
    deliveryPrice: parseFloat(String(r.delivery_price)),
    depositUrl: r.stripe_url || '',
    is_retail: !!r.is_retail,
    is_featured: !!r.is_featured,
    is_active: !!r.is_active,
    images: Array.isArray(r.images) ? r.images : (r.images ? JSON.parse(String(r.images)) : []),
    features: Array.isArray(r.features) ? r.features : (r.features ? JSON.parse(String(r.features)) : []),
    dimensions: r.dimensions || '',
    delivery: r.delivery || '',
    category: r.section_name,
  };
}

export async function GET(req: NextRequest) {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  await ensureSchema(sql);
  const isAdmin = await verifySession(req.headers.get('cookie'));
  try {
    const rows = isAdmin
      ? await sql`
          SELECT p.id, p.section_id, s.name as section_name, p.name, p.description,
            p.price, p.deposit_price, p.delivery_price, p.stripe_url, p.is_retail,
            p.is_featured, p.is_active, p.images, p.features, p.dimensions, p.delivery, p.sort_order
          FROM products p
          JOIN product_sections s ON p.section_id = s.id
          ORDER BY s.sort_order, s.name, p.sort_order, p.name
        `
      : await sql`
          SELECT p.id, p.section_id, s.name as section_name, p.name, p.description,
            p.price, p.deposit_price, p.delivery_price, p.stripe_url, p.is_retail,
            p.is_featured, p.is_active, p.images, p.features, p.dimensions, p.delivery, p.sort_order
          FROM products p
          JOIN product_sections s ON p.section_id = s.id
          WHERE p.is_active = true AND s.is_active = true
          ORDER BY s.sort_order, s.name, p.sort_order, p.name
        `;
    return NextResponse.json(rows.map((r: Record<string, unknown>) => serializeProduct(r)));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
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
  const { section_id, name, description = '', price = 0, deposit_price = 0, delivery_price = 0, stripe_url = '', is_retail = false, is_featured = false, is_active = true, images = [], features = [], dimensions = '', delivery = '', sort_order = 0 } = body;
  if (!section_id || !name || typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'section_id and name are required' }, { status: 400 });
  }
  try {
    const [row] = await sql`
      INSERT INTO products (section_id, name, description, price, deposit_price, delivery_price, stripe_url, is_retail, is_featured, is_active, images, features, dimensions, delivery, sort_order)
      VALUES (${section_id}, ${name.trim()}, ${description}, ${Number(price) || 0}, ${Number(deposit_price) || 0}, ${Number(delivery_price) || 0}, ${String(stripe_url)}, ${!!is_retail}, ${!!is_featured}, ${!!is_active}, ${JSON.stringify(Array.isArray(images) ? images : [])}, ${JSON.stringify(Array.isArray(features) ? features : [])}, ${String(dimensions)}, ${String(delivery)}, ${Number(sort_order) || 0})
      RETURNING id, section_id, name, description, price, deposit_price, delivery_price, stripe_url, is_retail, is_featured, is_active, images, features, dimensions, delivery, sort_order, created_at, updated_at
    `;
    return NextResponse.json(serializeProduct({ ...row, section_name: '' }));
  } catch (err: unknown) {
    if ((err as { code?: string }).code === '23503') return NextResponse.json({ error: 'Invalid section_id' }, { status: 400 });
    console.error(err);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await verifySession(req.headers.get('cookie')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  await ensureSchema(sql);
  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
    if (!id || isNaN(id)) return NextResponse.json({ error: 'id is required' }, { status: 400 });
  try {
    const [existing] = await sql`SELECT * FROM products WHERE id = ${id}`;
    if (!existing) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    const ex = existing as Record<string, unknown>;
    const name = typeof body.name === 'string' ? body.name.trim() : String(ex.name ?? '');
    const section_id = Number(body.section_id ?? ex.section_id);
    const description = body.description !== undefined ? String(body.description) : String(ex.description ?? '');
    const price = Number(body.price) ?? parseFloat(String(ex.price));
    const deposit_price = Number(body.deposit_price) ?? parseFloat(String(ex.deposit_price));
    const delivery_price = Number(body.delivery_price) ?? parseFloat(String(ex.delivery_price));
    const stripe_url = body.stripe_url !== undefined ? String(body.stripe_url) : String(ex.stripe_url ?? '');
    const is_retail = body.is_retail !== undefined ? !!body.is_retail : !!ex.is_retail;
    const is_featured = body.is_featured !== undefined ? !!body.is_featured : !!ex.is_featured;
    const is_active = body.is_active !== undefined ? !!body.is_active : !!ex.is_active;
    const images = Array.isArray(body.images) ? body.images : (Array.isArray(ex.images) ? ex.images : (ex.images ? JSON.parse(String(ex.images)) : []));
    const features = Array.isArray(body.features) ? body.features : (Array.isArray(ex.features) ? ex.features : (ex.features ? JSON.parse(String(ex.features)) : []));
    const dimensions = body.dimensions !== undefined ? String(body.dimensions) : String(ex.dimensions ?? '');
    const delivery = body.delivery !== undefined ? String(body.delivery) : String(ex.delivery ?? '');
    const sort_order = Number(body.sort_order) ?? Number(ex.sort_order) ?? 0;
    const [row] = await sql`
      UPDATE products SET section_id = ${section_id}, name = ${name}, description = ${description}, price = ${price}, deposit_price = ${deposit_price}, delivery_price = ${delivery_price}, stripe_url = ${stripe_url}, is_retail = ${is_retail}, is_featured = ${is_featured}, is_active = ${is_active}, images = ${JSON.stringify(images)}, features = ${JSON.stringify(features)}, dimensions = ${dimensions}, delivery = ${delivery}, sort_order = ${sort_order}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    const r = row as Record<string, unknown>;
    return NextResponse.json(serializeProduct({ ...r, section_name: r.section_name }));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
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
    const result = await sql`DELETE FROM products WHERE id = ${id} RETURNING id`;
    if (!result.length) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
