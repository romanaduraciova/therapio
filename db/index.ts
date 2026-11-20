import { drizzle } from 'drizzle-orm/libsql';

import * as tables from './schema';
import * as relations from './schema/relations';

export const db = drizzle({
	connection: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.AUTH_TOKEN
	},
	schema: { ...tables, ...relations }
});
