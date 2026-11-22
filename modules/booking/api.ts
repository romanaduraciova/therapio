import {
	type BookingActionErrorCode,
	type CreateBookingInput,
	freeSlotsResponseSchema
} from '@/modules/booking/schema';
import { createBookingAction } from '@/server/bookings/actions';
import {
	skipToken,
	useMutation,
	useQuery,
	useQueryClient
} from '@tanstack/react-query';
import { type z } from 'zod';

export const bookingKeys = {
	freeSlotsAll: ['free-slots'] as const,
	freeSlots: (typeId: string, month: string) =>
		['free-slots', typeId, month] as const
};

const fetchJson = async <T extends z.ZodType>(url: string, schema: T) => {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Request to ${url} failed with ${response.status}`);
	}

	return schema.parse(await response.json());
};

export const fetchFreeSlots = async (typeId: string, month: string) =>
	await fetchJson(
		`/api/slots?${new URLSearchParams({ typeId, month })}`,
		freeSlotsResponseSchema
	);

export const useFreeSlots = (typeId: string | undefined, month: string) =>
	useQuery({
		queryKey: bookingKeys.freeSlots(typeId ?? '', month),
		queryFn: typeId ? () => fetchFreeSlots(typeId, month) : skipToken
	});

export class BookingActionError extends Error {
	constructor(readonly code: BookingActionErrorCode) {
		super(code);
		this.name = 'BookingActionError';
	}
}

export const useCreateBooking = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateBookingInput) => {
			const result = await createBookingAction(input);

			if (!result.ok) {
				throw new BookingActionError(result.error);
			}

			return result;
		},
		onSettled: async () =>
			await queryClient.invalidateQueries({
				queryKey: bookingKeys.freeSlotsAll
			})
	});
};
