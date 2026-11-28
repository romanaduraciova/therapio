import type { Role } from '@/db/schema/user';

export type NavItem = {
	href: string;
	label: string;
	exactPath?: boolean;
	role?: Role;
};

export const clientNavItems: readonly NavItem[] = [
	{ href: '/', label: 'Home', exactPath: true },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' },
	{ href: '/bookings', label: 'My bookings', role: 'client' },
	{ href: '/book', label: 'Book a session', role: 'client' }
];

export const adminNavItems: readonly NavItem[] = [
	{ href: '/admin', label: 'Overview', exactPath: true, role: 'therapist' },
	{ href: '/admin/bookings', label: 'Bookings', role: 'therapist' },
	{ href: '/admin/availability', label: 'Availability', role: 'therapist' },
	{ href: '/admin/clients', label: 'Clients', role: 'therapist' },
	{ href: '/admin/blog', label: 'Blog', role: 'therapist' },
	{ href: '/admin/settings', label: 'Settings', role: 'therapist' }
];

export const isActiveItem = (pathname: string, { href, exactPath }: NavItem) =>
	exactPath
		? pathname === href
		: pathname === href || pathname.startsWith(`${href}/`);

export const filterNavItems = (
	items: readonly NavItem[],
	role: Role | undefined
) => items.filter(item => item.role === undefined || item.role === role);
