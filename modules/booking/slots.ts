import { toDateKey } from '@/lib/datetime';
import { BOOKING_LEAD_TIME_HOURS } from '@/modules/booking/constants';

export type TimeRange = {
	startsAt: Date;
	endsAt: Date;
};

export type AvailabilityWindow = TimeRange & {
	bookings: TimeRange[];
};

export type Slot = TimeRange & {
	available: boolean;
};

export type SlotDay = {
	date: string;
	slots: Slot[];
};

const MINUTE_MS = 60_000;
export const SLOT_STEP_MIN = 30;
const STEP_MS = SLOT_STEP_MIN * MINUTE_MS;
const LEAD_TIME_MS = BOOKING_LEAD_TIME_HOURS * 60 * MINUTE_MS;

export const overlaps = (a: TimeRange, b: TimeRange) =>
	a.startsAt < b.endsAt && b.startsAt < a.endsAt;

export const generateSlots = ({
	windows,
	durationMin,
	now,
	from,
	to
}: {
	windows: AvailabilityWindow[];
	durationMin: number;
	now: Date;
	from?: Date;
	to?: Date;
}): Slot[] => {
	const durationMs = durationMin * MINUTE_MS;
	const earliestStart = now.getTime() + LEAD_TIME_MS;

	const slots = windows.flatMap(window => {
		const windowSlots: Slot[] = [];
		const windowEnd = window.endsAt.getTime();

		for (
			let start = Math.ceil(window.startsAt.getTime() / STEP_MS) * STEP_MS;
			start + durationMs <= windowEnd;
			start += STEP_MS
		) {
			const range = {
				startsAt: new Date(start),
				endsAt: new Date(start + durationMs)
			};

			windowSlots.push({
				...range,
				available: !window.bookings.some(booking => overlaps(range, booking))
			});
		}

		return windowSlots;
	});

	return slots
		.filter(
			slot =>
				slot.startsAt.getTime() >= earliestStart &&
				(!from || slot.startsAt >= from) &&
				(!to || slot.startsAt < to)
		)
		.toSorted((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
};

export const findBookableSlot = ({
	windows,
	durationMin,
	startsAt,
	now
}: {
	windows: (AvailabilityWindow & { id: string })[];
	durationMin: number;
	startsAt: Date;
	now: Date;
}) => {
	for (const window of windows) {
		const slot = generateSlots({ windows: [window], durationMin, now }).find(
			candidate => candidate.startsAt.getTime() === startsAt.getTime()
		);

		if (slot?.available) {
			return {
				blockId: window.id,
				startsAt: slot.startsAt,
				endsAt: slot.endsAt
			};
		}
	}

	return null;
};

export const groupSlotsByDay = (slots: Slot[]): SlotDay[] => {
	const days = new Map<string, Slot[]>();

	for (const slot of slots) {
		const key = toDateKey(slot.startsAt);
		const daySlots = days.get(key);

		if (daySlots) {
			daySlots.push(slot);
		} else {
			days.set(key, [slot]);
		}
	}

	return [...days].map(([date, daySlots]) => ({ date, slots: daySlots }));
};
