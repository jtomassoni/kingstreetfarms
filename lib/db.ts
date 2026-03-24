import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

export function getDb() {
  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) throw new Error('DATABASE_URL or POSTGRES_URL not set');
  if (!sql) sql = postgres(dbUrl, { max: 1 });
  return sql;
}
