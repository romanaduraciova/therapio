import { clientNavItems } from '@/components/layout/nav-items';
import { SiteHeader } from '@/components/layout/site-header';
import type { ReactNode } from 'react';

// TODO: role check for client
const ClientLayout = ({ children }: { children: ReactNode }) => (
	<>
		<SiteHeader items={clientNavItems} />
		<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
			{children}
		</main>
	</>
);

export default ClientLayout;
