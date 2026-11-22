export type NavItem = {
	href: string;
	label: string;
};

export const publicNavItems: readonly NavItem[] = [
	{ href: '/', label: 'Home' },
	{ href: '/pricing', label: 'Pricing' },
	{ href: '/blog', label: 'Blog' },
	{ href: '/contact', label: 'Contact' }
];

export const isActiveHref = (pathname: string, href: string) =>
	href === '/'
		? pathname === '/'
		: pathname === href || pathname.startsWith(`${href}/`);
