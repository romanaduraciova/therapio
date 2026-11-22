import { monthRange } from '@/lib/datetime';
import { freeSlotsQuerySchema } from '@/modules/booking/schema';
import { generateSlots, groupSlotsByDay } from '@/modules/booking/slots';
import {
	getActiveBookingType,
	getAvailabilityWindows
} from '@/server/bookings/queries';
import { type NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
	const query = freeSlotsQuerySchema.safeParse(
		Object.fromEntries(request.nextUrl.searchParams)
	);

	if (!query.success) {
		return Response.json({ error: query.error.issues }, { status: 400 });
	}

	const bookingType = await getActiveBookingType(query.data.typeId);

	if (!bookingType) {
		return Response.json({ error: 'Session type not found' }, { status: 404 });
	}

	const { from, to } = monthRange(query.data.month);
	const windows = await getAvailabilityWindows(from, to);
	const slots = generateSlots({
		windows,
		durationMin: bookingType.durationMin,
		now: new Date(),
		from,
		to
	});

	return Response.json({ days: groupSlotsByDay(slots) });
};
