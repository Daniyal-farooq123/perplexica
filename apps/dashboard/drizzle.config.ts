import { defineConfig } from 'drizzle-kit';
import { readFileSync } from 'fs';
import { parse } from '@iarna/toml';
import type { Config } from 'drizzle-kit'


const config = parse(readFileSync('./config.toml', 'utf-8'));

export default {
  dialect: 'postgresql',
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: config.DATABASE.NEON_URL as string,
  },
} satisfies Config
