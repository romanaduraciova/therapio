'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { MainNav } from './main-nav';
import type { NavItem } from './nav-items';

export const MobileNav = ({ items }: { items: readonly NavItem[] }) => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button variant="ghost" size="icon-sm" aria-label="Open menu" />
				}
			>
				<Menu />
			</SheetTrigger>
			<SheetContent side="right">
				<SheetHeader>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>
				<MainNav
					items={items}
					orientation="vertical"
					onNavigate={() => setOpen(false)}
					className="px-5"
				/>
			</SheetContent>
		</Sheet>
	);
};
