import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const bookingType = sqliteTable('booking_type', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull().unique(),
	durationMin: integer('duration_min').notNull(),
	priceCzk: integer('price_czk').notNull(),
	active: integer('active', { mode: 'boolean' }).notNull()
});
