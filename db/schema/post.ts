import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { category } from './category';

export const post = sqliteTable('post', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull().unique(),
	slug: text('slug').notNull().unique(),
	content: text('content').notNull(),
	categoryId: text('category_id').references(() => category.id, {
		onDelete: 'set null'
	}),
	published: integer('published', { mode: 'boolean' }),
	publishedAt: integer('published_at', { mode: 'timestamp_ms' })
});
