import 'server-only';
import { db } from '@/db';
import { parseDateKey } from '@/lib/datetime';
import { type AvailabilityQuery } from '@/modules/booking/schema';
import { bookingTags } from '@/modules/booking/tags';
import { getCurrentUser } from '@/server/session';
import { cacheLife, cacheTag } from 'next/cache';

export type DbExecutor = Pick<typeof db, 'query'>;

export const getActiveBookingType = async (id: string) =>
	await db.query.bookingType.findFirst({
		where: (type, { and, eq }) => and(eq(type.id, id), eq(type.active, true))
	});

export const getActiveBookingTypes = async () => {
	'use cache';
	cacheTag(bookingTags.bookingTypes);
	cacheLife('max');

	return await db.query.bookingType.findMany({
		where: (type, { eq }) => eq(type.active, true),
		columns: { id: true, name: true, durationMin: true, priceCzk: true },
		orderBy: (type, { asc }) => [asc(type.priceCzk)]
	});
};

export const getAvailabilityWindows = async (
	from: Date,
	to: Date,
	executor: DbExecutor = db
) =>
	await executor.query.availabilityBlock.findMany({
		where: (block, { and, lt, gt }) =>
			and(lt(block.startsAt, to), gt(block.endsAt, from)),
		with: {
			bookings: {
				where: (booking, { ne }) => ne(booking.status, 'cancelled'),
				columns: { startsAt: true, endsAt: true }
			}
		},
		orderBy: (block, { asc }) => [asc(block.startsAt)]
	});

const getAvailabilityWithBookings = async (from: Date, to: Date) => {
	'use cache';
	cacheTag(bookingTags.bookings, bookingTags.availability);
	cacheLife('max');

	return await db.query.availabilityBlock.findMany({
		where: (block, { and, lt, gt }) =>
			and(lt(block.startsAt, to), gt(block.endsAt, from)),
		with: {
			bookings: {
				where: (booking, { ne }) => ne(booking.status, 'cancelled'),
				columns: {
					id: true,
					startsAt: true,
					endsAt: true,
					status: true,
					format: true
				},
				with: {
					client: { columns: { id: true, name: true } },
					bookingType: { columns: { id: true, name: true } }
				},
				orderBy: (booking, { asc }) => [asc(booking.startsAt)]
			}
		},
		orderBy: (block, { asc }) => [asc(block.startsAt)]
	});
};

const getClientBookings = async (clientId: string) => {
	'use cache';
	cacheTag(bookingTags.clientBookings(clientId));
	cacheLife('max');

	return await db.query.booking.findMany({
		where: (booking, { eq }) => eq(booking.clientId, clientId),
		columns: {
			id: true,
			startsAt: true,
			endsAt: true,
			status: true,
			format: true,
			videoUrl: true,
			priceCzk: true
		},
		with: {
			bookingType: { columns: { id: true, name: true } }
		},
		orderBy: (booking, { desc }) => [desc(booking.startsAt)]
	});
};

export const getTherapistSchedule = async ({ from, to }: AvailabilityQuery) => {
	const user = await getCurrentUser();

	if (user?.role !== 'therapist') {
		return null;
	}

	return await getAvailabilityWithBookings(
		parseDateKey(from),
		parseDateKey(to)
	);
};

export type TherapistSchedule = NonNullable<
	Awaited<ReturnType<typeof getTherapistSchedule>>
>;

export const getMyBookings = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return null;
	}

	return await getClientBookings(user.id);
};

export type MyBookings = NonNullable<Awaited<ReturnType<typeof getMyBookings>>>;
