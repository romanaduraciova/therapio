import { AuthButton } from '@/components/auth-button';
import { ThemeToggle } from '@/components/theme-toggle';
import { getCurrentUser } from '@/server/session';
import Link from 'next/link';
import { Suspense } from 'react';

import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';
import { filterNavItems, type NavItem } from './nav-items';
import { NavList } from './nav-list';
import { UserName } from './user-name';

type SiteHeaderProps = {
	items: readonly NavItem[];
};

const getVisibleNavItems = async (items: readonly NavItem[]) => {
	const user = await getCurrentUser();
	return filterNavItems(items, user?.role);
};

const DesktopNav = async ({ items }: SiteHeaderProps) => (
	<MainNav items={await getVisibleNavItems(items)} />
);

const MobileNavWithRole = async ({ items }: SiteHeaderProps) => (
	<MobileNav items={await getVisibleNavItems(items)} />
);

export const SiteHeader = ({ items }: SiteHeaderProps) => {
	const publicItems = filterNavItems(items, undefined);

	return (
		<header className="bg-background sticky top-0 z-40 w-full border-b">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
				<Link href="/" className="font-heading text-lg font-bold">
					Therapio
				</Link>

				<div className="hidden md:block">
					<Suspense fallback={<NavList items={publicItems} />}>
						<DesktopNav items={items} />
					</Suspense>
				</div>

				<div className="flex items-center gap-2">
					<UserName />
					<ThemeToggle />
					<AuthButton />
					<div className="md:hidden">
						<Suspense fallback={<MobileNav items={publicItems} />}>
							<MobileNavWithRole items={items} />
						</Suspense>
					</div>
				</div>
			</div>
		</header>
	);
};
