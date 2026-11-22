import { daysBetween } from '@/lib/datetime';
import {
	BLOCK_GRID_MIN,
	MAX_BLOCK_HOURS,
	format
} from '@/modules/booking/constants';
import { z } from 'zod';

export const monthKeySchema = z
	.string()
	.regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Expected month in YYYY-MM format');

export const dateKeySchema = z
	.string()
	.regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected date in YYYY-MM-DD format');

export const freeSlotsQuerySchema = z.object({
	typeId: z.uuid(),
	month: monthKeySchema
});
export type FreeSlotsQuery = z.infer<typeof freeSlotsQuerySchema>;

export const slotSchema = z.object({
	startsAt: z.coerce.date(),
	endsAt: z.coerce.date(),
	available: z.boolean()
});

export const freeSlotsResponseSchema = z.object({
	days: z.array(
		z.object({
			date: dateKeySchema,
			slots: z.array(slotSchema)
		})
	)
});
export type FreeSlotsResponse = z.infer<typeof freeSlotsResponseSchema>;

export const createBookingSchema = z.object({
	typeId: z.uuid(),
	startsAt: z.date(),
	format: z.enum(format)
});
export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const bookingActionErrors = [
	'UNAUTHORIZED',
	'FORBIDDEN',
	'INVALID_INPUT',
	'SESSION_TYPE_NOT_FOUND',
	'SLOT_UNAVAILABLE',
	'BLOCK_NOT_FOUND',
	'BLOCK_OVERLAP',
	'BLOCK_HAS_BOOKINGS',
	'BOOKINGS_OUTSIDE_BLOCK'
] as const;
export type BookingActionErrorCode = (typeof bookingActionErrors)[number];

export type BookingActionResult<T = Record<never, never>> =
	| ({ ok: true } & T)
	| { ok: false; error: BookingActionErrorCode };

export type CreateBookingResult = BookingActionResult<{ bookingId: string }>;

const MAX_RANGE_DAYS = 62;

export const availabilityQuerySchema = z
	.object({
		from: dateKeySchema,
		to: dateKeySchema
	})
	.refine(({ from, to }) => from < to, 'from must be before to')
	.refine(
		({ from, to }) => daysBetween(from, to) <= MAX_RANGE_DAYS,
		`Range must be at most ${MAX_RANGE_DAYS} days`
	);
export type AvailabilityQuery = z.infer<typeof availabilityQuerySchema>;

const isOnBlockGrid = (date: Date) =>
	date.getTime() % (BLOCK_GRID_MIN * 60_000) === 0;

export const blockRangeSchema = z
	.object({
		startsAt: z.date(),
		endsAt: z.date()
	})
	.refine(({ startsAt, endsAt }) => startsAt < endsAt, {
		message: 'Block must end after it starts',
		path: ['endsAt']
	})
	.refine(
		({ startsAt, endsAt }) => isOnBlockGrid(startsAt) && isOnBlockGrid(endsAt),
		`Block must start and end on a ${BLOCK_GRID_MIN}-minute boundary`
	)
	.refine(
		({ startsAt, endsAt }) =>
			endsAt.getTime() - startsAt.getTime() <= MAX_BLOCK_HOURS * 3_600_000,
		{
			message: `Block can be at most ${MAX_BLOCK_HOURS} hours long`,
			path: ['endsAt']
		}
	);
export type BlockRangeInput = z.infer<typeof blockRangeSchema>;

export const blockIdSchema = z.object({ blockId: z.string().min(1) });
export type BlockIdInput = z.infer<typeof blockIdSchema>;

export const updateBlockSchema = z.intersection(
	blockIdSchema,
	blockRangeSchema
);
export type UpdateBlockInput = z.infer<typeof updateBlockSchema>;

export type CreateBlockResult = BookingActionResult<{ blockId: string }>;
