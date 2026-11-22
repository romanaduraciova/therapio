import { publicNavItems } from '@/components/layout/nav-items';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import type { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => (
	<>
		<SiteHeader items={publicNavItems} />
		<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
			{children}
		</main>
		<SiteFooter />
	</>
);

export default PublicLayout;
