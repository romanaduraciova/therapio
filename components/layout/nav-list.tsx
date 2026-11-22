import { cn } from '@/lib/utils';
import Link from 'next/link';

import { isActiveItem, type NavItem } from './nav-items';

export type NavListProps = {
	items: readonly NavItem[];
	pathname?: string;
	orientation?: 'horizontal' | 'vertical';
	onNavigate?: () => void;
	className?: string;
};

export const NavList = ({
	items,
	pathname,
	orientation = 'horizontal',
	onNavigate,
	className
}: NavListProps) => (
	<nav aria-label="Main" className={className}>
		<ul
			className={cn(
				'flex gap-1',
				orientation === 'vertical' ? 'flex-col' : 'items-center'
			)}
		>
			{items.map(item => {
				const isActive = pathname !== undefined && isActiveItem(pathname, item);

				return (
					<li key={item.href}>
						<Link
							href={item.href}
							onClick={onNavigate}
							aria-current={isActive ? 'page' : undefined}
							className={cn(
								'text-muted-foreground hover:text-foreground block px-3 py-2 font-medium transition-colors',
								orientation === 'vertical' ? 'text-base' : 'text-sm',
								isActive && 'text-foreground bg-muted'
							)}
						>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	</nav>
);
