'use server';

import { db } from '@/db';
import { booking } from '@/db/schema/booking';
import {
	type CreateBookingInput,
	type CreateBookingResult,
	createBookingSchema
} from '@/modules/booking/schema';
import { findBookableSlot } from '@/modules/booking/slots';
import { bookingTags } from '@/modules/booking/tags';
import {
	getActiveBookingType,
	getAvailabilityWindows
} from '@/server/bookings/queries';
import { getCurrentUser } from '@/server/session';
import { updateTag } from 'next/cache';

const MINUTE_MS = 60_000;

const isDatabaseBusy = (error: unknown): boolean => {
	if (!(error instanceof Error)) {
		return false;
	}

	const code = 'code' in error ? String(error.code) : '';

	return (
		code.startsWith('SQLITE_BUSY') ||
		error.message.includes('database is locked') ||
		isDatabaseBusy(error.cause)
	);
};

const refreshBookingCaches = (clientId: string) => {
	updateTag(bookingTags.bookings);
	updateTag(bookingTags.clientBookings(clientId));
};

export const createBookingAction = async (
	input: CreateBookingInput
): Promise<CreateBookingResult> => {
	const user = await getCurrentUser();

	if (!user) {
		return { ok: false, error: 'UNAUTHORIZED' };
	}

	if (user.role === 'therapist') {
		return { ok: false, error: 'FORBIDDEN' };
	}

	const parsed = createBookingSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const { typeId, startsAt, format } = parsed.data;

	const type = await getActiveBookingType(typeId);

	if (!type) {
		return { ok: false, error: 'SESSION_TYPE_NOT_FOUND' };
	}

	const endsAt = new Date(startsAt.getTime() + type.durationMin * MINUTE_MS);

	const bookingId = await db
		.transaction(async tx => {
			const windows = await getAvailabilityWindows(startsAt, endsAt, tx);
			const slot = findBookableSlot({
				windows,
				durationMin: type.durationMin,
				startsAt,
				now: new Date()
			});

			if (!slot) {
				return null;
			}

			const [created] = await tx
				.insert(booking)
				.values({
					clientId: user.id,
					bookingTypeId: type.id,
					availabilityBlockId: slot.blockId,
					startsAt: slot.startsAt,
					endsAt: slot.endsAt,
					format,
					status: 'pending',
					priceCzk: type.priceCzk,
					createdAt: new Date()
				})
				.returning({ id: booking.id });

			return created.id;
		})
		.catch((error: unknown) => {
			if (isDatabaseBusy(error)) {
				return null;
			}

			throw error;
		});

	if (!bookingId) {
		return { ok: false, error: 'SLOT_UNAVAILABLE' };
	}

	refreshBookingCaches(user.id);

	return { ok: true, bookingId };
};
