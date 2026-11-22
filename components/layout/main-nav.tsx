'use client';

import { usePathname } from 'next/navigation';

import { NavList, type NavListProps } from './nav-list';

export const MainNav = (props: Omit<NavListProps, 'pathname'>) => {
	const pathname = usePathname();

	return <NavList {...props} pathname={pathname} />;
};
