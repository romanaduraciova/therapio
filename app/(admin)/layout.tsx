import { adminNavItems } from '@/components/layout/nav-items';
import { SiteHeader } from '@/components/layout/site-header';
import type { ReactNode } from 'react';

// TODO: role check for therapist
const AdminLayout = ({ children }: { children: ReactNode }) => (
	<>
		<SiteHeader items={adminNavItems} />
		<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
			{children}
		</main>
	</>
);

export default AdminLayout;
