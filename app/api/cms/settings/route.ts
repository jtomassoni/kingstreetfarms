import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/auth';
import { getDb } from '@/lib/db';

const SETTINGS_KEYS = ['featured_products', 'shop_section', 'contact_section', 'nav_shop', 'nav_contact'];
const DEFAULTS = Object.fromEntries(SETTINGS_KEYS.map((k) => [k, true])) as Record<string, boolean>;

async function ensureSettingsSchema(sql: ReturnType<typeof import('@/lib/db').getDb>) {
  await sql`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      enabled BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  for (const key of SETTINGS_KEYS) {
    await sql`
      INSERT INTO site_settings (key, enabled) VALUES (${key}, true)
      ON CONFLICT (key) DO NOTHING
    `;
  }
}

export async function GET(req: NextRequest) {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) return NextResponse.json(DEFAULTS);
  const sql = getDb();
  try {
    await ensureSettingsSchema(sql);
    const rows = await sql`SELECT key, enabled FROM site_settings`;
    const settings = { ...DEFAULTS };
    (rows as unknown as { key: string; enabled: boolean }[]).forEach((r) => { if (r.key in settings) settings[r.key] = !!r.enabled; });
    return NextResponse.json(settings);
  } catch (err) {
    console.error(err);
    return NextResponse.json(DEFAULTS);
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
  const { key, enabled } = body;
  if (!SETTINGS_KEYS.includes(key) || typeof enabled !== 'boolean') {
    return NextResponse.json({ error: 'Invalid key or enabled' }, { status: 400 });
  }
  try {
    await ensureSettingsSchema(sql);
    await sql`
      INSERT INTO site_settings (key, enabled, updated_at) VALUES (${key}, ${enabled}, NOW())
      ON CONFLICT (key) DO UPDATE SET enabled = ${enabled}, updated_at = NOW()
    `;
    const rows = await sql`SELECT key, enabled FROM site_settings`;
    const settings = { ...DEFAULTS };
    (rows as unknown as { key: string; enabled: boolean }[]).forEach((r) => { if (r.key in settings) settings[r.key] = !!r.enabled; });
    return NextResponse.json({ success: true, settings });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
