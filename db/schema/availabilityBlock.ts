import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const availabilityBlock = sqliteTable('availability_block', {
	id: text('id').primaryKey(),
	startsAt: integer('starts_at', { mode: 'timestamp_ms' }).notNull(),
	endsAt: integer('ends_at', { mode: 'timestamp_ms' }).notNull()
});
