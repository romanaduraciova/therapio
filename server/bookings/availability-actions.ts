'use server';

import { db } from '@/db';
import { availabilityBlock } from '@/db/schema/availabilityBlock';
import { booking } from '@/db/schema/booking';
import {
	type BlockIdInput,
	type BlockRangeInput,
	type BookingActionResult,
	type CreateBlockResult,
	type UpdateBlockInput,
	blockIdSchema,
	blockRangeSchema,
	updateBlockSchema
} from '@/modules/booking/schema';
import { bookingTags } from '@/modules/booking/tags';
import { getCurrentUser } from '@/server/session';
import { and, eq, gt, inArray, lt, ne, or } from 'drizzle-orm';
import { updateTag } from 'next/cache';

type Executor = Pick<typeof db, 'select'>;

const authorizeTherapist = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return 'UNAUTHORIZED' as const;
	}

	return user.role === 'therapist' ? null : ('FORBIDDEN' as const);
};

const overlapsOtherBlock = async (
	executor: Executor,
	{ startsAt, endsAt }: BlockRangeInput,
	excludeId?: string
) => {
	const [found] = await executor
		.select({ id: availabilityBlock.id })
		.from(availabilityBlock)
		.where(
			and(
				lt(availabilityBlock.startsAt, endsAt),
				gt(availabilityBlock.endsAt, startsAt),
				excludeId ? ne(availabilityBlock.id, excludeId) : undefined
			)
		)
		.limit(1);

	return Boolean(found);
};

export const createAvailabilityBlockAction = async (
	input: BlockRangeInput
): Promise<CreateBlockResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = blockRangeSchema.safeParse(input);

	if (!parsed.success || parsed.data.startsAt <= new Date()) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const range = parsed.data;

	const blockId = await db.transaction(async tx => {
		if (await overlapsOtherBlock(tx, range)) {
			return null;
		}

		const [created] = await tx
			.insert(availabilityBlock)
			.values(range)
			.returning({ id: availabilityBlock.id });

		return created.id;
	});

	if (!blockId) {
		return { ok: false, error: 'BLOCK_OVERLAP' };
	}

	updateTag(bookingTags.availability);

	return { ok: true, blockId };
};

export const updateAvailabilityBlockAction = async (
	input: UpdateBlockInput
): Promise<BookingActionResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = updateBlockSchema.safeParse(input);

	if (!parsed.success || parsed.data.startsAt <= new Date()) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const { blockId, startsAt, endsAt } = parsed.data;

	const error = await db.transaction(async tx => {
		const [block] = await tx
			.select({ id: availabilityBlock.id })
			.from(availabilityBlock)
			.where(eq(availabilityBlock.id, blockId));

		if (!block) {
			return 'BLOCK_NOT_FOUND' as const;
		}

		if (await overlapsOtherBlock(tx, { startsAt, endsAt }, blockId)) {
			return 'BLOCK_OVERLAP' as const;
		}

		const [outside] = await tx
			.select({ id: booking.id })
			.from(booking)
			.where(
				and(
					eq(booking.availabilityBlockId, blockId),
					inArray(booking.status, ['pending', 'confirmed']),
					or(lt(booking.startsAt, startsAt), gt(booking.endsAt, endsAt))
				)
			)
			.limit(1);

		if (outside) {
			return 'BOOKINGS_OUTSIDE_BLOCK' as const;
		}

		await tx
			.update(availabilityBlock)
			.set({ startsAt, endsAt })
			.where(eq(availabilityBlock.id, blockId));

		return null;
	});

	if (error) {
		return { ok: false, error };
	}

	updateTag(bookingTags.availability);

	return { ok: true };
};

export const deleteAvailabilityBlockAction = async (
	input: BlockIdInput
): Promise<BookingActionResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = blockIdSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const { blockId } = parsed.data;

	const error = await db.transaction(async tx => {
		const [block] = await tx
			.select({ id: availabilityBlock.id })
			.from(availabilityBlock)
			.where(eq(availabilityBlock.id, blockId));

		if (!block) {
			return 'BLOCK_NOT_FOUND' as const;
		}

		const [anyBooking] = await tx
			.select({ id: booking.id })
			.from(booking)
			.where(eq(booking.availabilityBlockId, blockId))
			.limit(1);

		if (anyBooking) {
			return 'BLOCK_HAS_BOOKINGS' as const;
		}

		await tx.delete(availabilityBlock).where(eq(availabilityBlock.id, blockId));

		return null;
	});

	if (error) {
		return { ok: false, error };
	}

	updateTag(bookingTags.availability);

	return { ok: true };
};
