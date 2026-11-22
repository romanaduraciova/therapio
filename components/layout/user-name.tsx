'use client';

import { useSession } from '@/lib/auth-client';

export const UserName = () => {
	const { data: session } = useSession();
	if (!session) return null;

	return (
		<span className="mr-2 hidden max-w-40 truncate text-sm font-medium sm:block">
			{session.user.name}
		</span>
	);
};
