import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const ProfileDetails = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect('/login');

	return (
		<>
			<p>{session.user.name}</p>
			<p>{session.user.email}</p>
		</>
	);
};

const ProfilePage = () => (
	<>
		<h1>Your Profile</h1>
		<Suspense fallback={<p>Loading…</p>}>
			<ProfileDetails />
		</Suspense>
	</>
);

export default ProfilePage;
