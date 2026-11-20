import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const category = sqliteTable('category', {
	id: text('id').primaryKey(),
	name: text('name').notNull().unique(),
	slug: text('slug').notNull().unique()
});
