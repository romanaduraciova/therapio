import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

import { user } from './user';

export const clientNote = sqliteTable('client_note', {
	id: text('id').primaryKey(),
	clientId: text('client_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	noteDate: integer('note_date', { mode: 'timestamp_ms' })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	text: text('text').notNull()
});
