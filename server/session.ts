import 'server-only';
import { db } from '@/db';
import { type Role } from '@/db/schema/user';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { forbidden, redirect } from 'next/navigation';
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

export const requireRole = async (role: Role) => {
	const user = await getCurrentUser();

	if (!user) {
		redirect('/login');
	}

	if (user.role !== role) {
		forbidden();
	}

	return user;
};
