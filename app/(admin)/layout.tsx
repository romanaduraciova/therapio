import { adminNavItems } from '@/components/layout/nav-items';
import { SiteHeader } from '@/components/layout/site-header';
import { requireRole } from '@/server/session';
import type { ReactNode } from 'react';

const AdminLayout = async ({ children }: { children: ReactNode }) => {
	await requireRole('therapist');
	return (
		<>
			<SiteHeader items={adminNavItems} />
			<main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
				{children}
			</main>
		</>
	);
};

export default AdminLayout;
