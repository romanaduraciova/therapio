import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(process.cwd());

export default defineConfig({
	schema: ['./db/schema/*'],
	out: '.drizzle',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
});
