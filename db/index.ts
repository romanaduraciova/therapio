import { drizzle } from 'drizzle-orm/libsql';

import * as tables from './schema';

export const db = drizzle({
	connection: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.AUTH_TOKEN
	},
	schema: { ...tables }
});
