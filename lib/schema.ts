import type postgres from 'postgres';
export async function ensureSchema(sql: ReturnType<typeof postgres>) {
  await sql`
    CREATE TABLE IF NOT EXISTS product_sections (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      sort_order INT NOT NULL DEFAULT 0,
      is_active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      section_id INT NOT NULL REFERENCES product_sections(id),
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      deposit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
      delivery_price DECIMAL(10,2) NOT NULL DEFAULT 0,
      stripe_url TEXT NOT NULL DEFAULT '',
      is_retail BOOLEAN NOT NULL DEFAULT false,
      is_featured BOOLEAN NOT NULL DEFAULT false,
      is_active BOOLEAN NOT NULL DEFAULT true,
      images JSONB NOT NULL DEFAULT '[]',
      features JSONB NOT NULL DEFAULT '[]',
      dimensions TEXT DEFAULT '',
      delivery TEXT DEFAULT '',
      sort_order INT NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
