import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const settings = sqliteTable('settings', {
	id: text('id').primaryKey(),
	iban: text('iban').notNull().unique(),
	bankName: text('bank_name').notNull(),
	accountHolder: text('account_holder').notNull(),
	calendarFeedToken: text('calendar_feed_token')
});
