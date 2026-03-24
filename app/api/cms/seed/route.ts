import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getDb } from '@/lib/db';
import { ensureSchema } from '@/lib/schema';
import { SECTIONS, PRODUCTS } from '@/lib/seed-data';

export async function POST(req: NextRequest) {
  if (!(await verifySession(req.headers.get('cookie')))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  const sql = getDb();
  await ensureSchema(sql);
  try {
    const existing = await sql`SELECT 1 FROM products LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Database already has products. Seed only runs on empty database.' }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to check existing data' }, { status: 500 });
  }
  try {
    const idMap: Record<string, number> = {};
    for (const s of SECTIONS) {
      const [row] = await sql`
        INSERT INTO product_sections (name, sort_order, is_active)
        VALUES (${s.name}, ${s.sort_order}, true)
        ON CONFLICT (name) DO UPDATE SET sort_order = ${s.sort_order}
        RETURNING id, name
      `;
      if (row) idMap[(row as { name: string }).name] = (row as { id: number }).id;
    }
    for (const p of PRODUCTS) {
      const sectionId = idMap[p.section];
      if (!sectionId) continue;
      await sql`
        INSERT INTO products (section_id, name, description, price, deposit_price, delivery_price, stripe_url, is_retail, is_featured, is_active, images, features, dimensions, delivery, sort_order)
        VALUES (${sectionId}, ${p.name}, ${p.description}, ${p.price}, ${p.deposit_price}, ${p.delivery_price}, ${p.stripe_url}, ${p.is_retail}, ${p.is_featured}, true, ${JSON.stringify(p.images)}, ${JSON.stringify(p.features)}, ${p.dimensions}, ${p.delivery}, ${p.sort_order})
      `;
    }
    return NextResponse.json({ success: true, message: `Seeded ${SECTIONS.length} sections and ${PRODUCTS.length} products` });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Seed failed', detail: (err as Error).message }, { status: 500 });
  }
}
