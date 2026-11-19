import { AuthButton } from '@/components/auth-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';

const Greeting = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) {
		return <p>Login for a greeting!</p>;
	}
	return <p>Hello {session?.user.name}!</p>;
};

const HomePage = () => (
	<div className="flex flex-col gap-4">
		<nav className="flex flex-row justify-end gap-2">
			<ThemeToggle />
			<AuthButton />
		</nav>
		<div>
			<Suspense fallback={<p>Hello…</p>}>
				<Greeting />
			</Suspense>
			<Link href="/profile">Go to profile</Link>
		</div>
	</div>
);

export default HomePage;
