import { AuthButton } from '@/components/auth-button';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export const SiteHeader = () => (
	<header className="bg-background sticky top-0 z-40 w-full border-b">
		<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
			<Link href="/" className="font-heading text-lg font-bold">
				Therapio
			</Link>
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<AuthButton />
			</div>
		</div>
	</header>
);
