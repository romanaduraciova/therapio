import { clientNavItems } from '@/components/layout/nav-items';
import { SiteHeader } from '@/components/layout/site-header';
import { requireRole } from '@/server/session';
import type { ReactNode } from 'react';

const ClientLayout = async ({ children }: { children: ReactNode }) => {
	await requireRole('client');
	return (
		<>
			<SiteHeader items={clientNavItems} />
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
				{children}
			</main>
		</>
	);
};

export default ClientLayout;
