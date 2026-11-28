import 'server-only';
import { db } from '@/db';
import { account, booking, user } from '@/db/schema';
import { count, eq, max, sql } from 'drizzle-orm';

export const getClients = async () =>
	await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			hasAccount: sql<boolean>`exists (
			  select 1 from ${account} where ${account.userId} = ${user.id}
			)`.mapWith(Boolean),
			bookingCount: count(booking.id),
			lastBooking: max(booking.startsAt)
		})
		.from(user)
		.leftJoin(booking, eq(booking.clientId, user.id))
		.where(eq(user.role, 'client'))
		.groupBy(user.id)
		.orderBy(user.name);

export const getClientDetails = async (id: string) =>
	await db.query.user.findFirst({
		columns: { name: true, email: true, phone: true },
		where: (user, { eq }) => eq(user.id, id),
		with: {
			bookings: {
				columns: { id: true, startsAt: true, format: true, status: true },
				with: {
					bookingType: {
						columns: { name: true, priceCzk: true }
					}
				},
				orderBy: (booking, { desc }) => [desc(booking.startsAt)]
			},
			clientNotes: {
				columns: {
					clientId: false
				},
				orderBy: (clientNote, { desc }) => [desc(clientNote.noteDate)]
			}
		}
	});

export type Clients = Awaited<ReturnType<typeof getClients>>;
export type ClientDetails = NonNullable<
	Awaited<ReturnType<typeof getClientDetails>>
>;
