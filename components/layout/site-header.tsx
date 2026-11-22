import { AuthButton } from '@/components/auth-button';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import { Suspense } from 'react';

import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { publicNavItems } from './nav-items';
import { NavList } from './nav-list';

export const SiteHeader = () => (
	<header className="bg-background sticky top-0 z-40 w-full border-b">
		<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
			<Link href="/" className="font-heading text-lg font-bold">
				Therapio
			</Link>

			<div className="hidden md:block">
				<Suspense fallback={<NavList items={publicNavItems} />}>
					<MainNav items={publicNavItems} />
				</Suspense>
			</div>

			<div className="flex items-center gap-2">
				<ThemeToggle />
				<AuthButton />
				<div className="md:hidden">
					<MobileNav items={publicNavItems} />
				</div>
			</div>
		</div>
	</header>
);
