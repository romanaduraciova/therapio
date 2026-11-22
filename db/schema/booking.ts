import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import z from 'zod';

import { format, status } from '../../modules/booking/constants';
import { availabilityBlock } from './availabilityBlock';
import { bookingType } from './bookingType';
import { role, user } from './user';

export { format, status };

export const formatSchema = z.enum(format);
export type Format = z.infer<typeof formatSchema>;

export const statusSchema = z.enum(status);
export type Status = z.infer<typeof statusSchema>;

export const booking = sqliteTable('booking', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	clientId: text('client_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	bookingTypeId: text('booking_type_id')
		.notNull()
		.references(() => bookingType.id, { onDelete: 'restrict' }),
	availabilityBlockId: text('availability_block_id')
		.notNull()
		.references(() => availabilityBlock.id, { onDelete: 'restrict' }),
	startsAt: integer('starts_at', { mode: 'timestamp_ms' }).notNull(),
	endsAt: integer('ends_at', { mode: 'timestamp_ms' }).notNull(),
	format: text('format', { enum: format }).notNull(),
	status: text('status', { enum: status }).notNull(),
	videoUrl: text('video_url'),
	priceCzk: integer('price_czk').notNull(),
	cancelledBy: text('cancelled_by', { enum: role }),
	cancelledAt: integer('cancelled_at', { mode: 'timestamp_ms' }),
	createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull()
});
