/* eslint-disable no-console */
import dotenv from 'dotenv';
import { drizzle as drizzlePostgres } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import postgres from 'postgres';
import { migrate as migratePostgres } from 'drizzle-orm/postgres-js/migrator';
import { migrate as migrateVercel } from 'drizzle-orm/vercel-postgres/migrator';

dotenv.config();

const vercelDb = drizzleVercel(sql);
const localDb = drizzlePostgres(
  postgres(process.env.LOCAL_DATABASE_URL ?? '', { max: 1 })
);

async function runMigrations() {
  console.log('Running migrations');

  if (process.env.LOCAL_DATABASE_URL) {
    await migratePostgres(localDb, { migrationsFolder: './src/db/migrations' });
  } else {
    await migrateVercel(vercelDb, { migrationsFolder: './src/db/migrations' });
  }

  console.log('Migrated successfully');

  process.exit(0);
}

runMigrations().catch((e) => {
  console.error('Migration failed');
  console.error(e);
  process.exit(1);
});
