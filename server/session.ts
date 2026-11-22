import 'server-only';
import { db } from '@/db';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		return null;
	}

	return (
		(await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, session.user.id),
			columns: { id: true, name: true, email: true, role: true }
		})) ?? null
	);
});
