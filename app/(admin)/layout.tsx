import type { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => (
	<main className="flex-1">{children}</main>
);

export default AdminLayout;
