export type NavItem = {
	href: string;
	label: string;
	exactPath?: boolean;
};

export const publicNavItems: readonly NavItem[] = [
	{ href: '/', label: 'Home', exactPath: true },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' }
];

export const clientNavItems: readonly NavItem[] = [
	{ href: '/bookings', label: 'My bookings' },
	{ href: '/book', label: 'Book a session' },
	{ href: '/profile', label: 'Profile' }
];

export const adminNavItems: readonly NavItem[] = [
	{ href: '/admin', label: 'Overview', exactPath: true },
	{ href: '/admin/bookings', label: 'Bookings' },
	{ href: '/admin/availability', label: 'Availability' },
	{ href: '/admin/clients', label: 'Clients' },
	{ href: '/admin/blog', label: 'Blog' },
	{ href: '/admin/settings', label: 'Settings' }
];

export const isActiveItem = (pathname: string, { href, exactPath }: NavItem) =>
	exactPath
		? pathname === href
		: pathname === href || pathname.startsWith(`${href}/`);
