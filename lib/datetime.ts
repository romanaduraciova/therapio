import { TZDate } from '@date-fns/tz';
import { addMonths, differenceInCalendarDays, format } from 'date-fns';

export const APP_TIME_ZONE = 'Europe/Prague';

const toPlainDate = (date: Date) => new Date(date.getTime());

export const zonedTimeToUtc = (
	year: number,
	month: number,
	day: number,
	hour = 0,
	minute = 0
) => toPlainDate(new TZDate(year, month - 1, day, hour, minute, APP_TIME_ZONE));

export const toDateKey = (date: Date) =>
	format(new TZDate(date, APP_TIME_ZONE), 'yyyy-MM-dd');

export const parseDateKey = (dateKey: string) => {
	const [year, month, day] = dateKey.split('-').map(Number);
	return zonedTimeToUtc(year, month, day);
};

export const monthRange = (monthKey: string) => {
	const [year, month] = monthKey.split('-').map(Number);
	const from = new TZDate(year, month - 1, 1, APP_TIME_ZONE);

	return { from: toPlainDate(from), to: toPlainDate(addMonths(from, 1)) };
};

export const daysBetween = (fromKey: string, toKey: string) =>
	differenceInCalendarDays(
		new TZDate(parseDateKey(toKey), APP_TIME_ZONE),
		new TZDate(parseDateKey(fromKey), APP_TIME_ZONE)
	);
