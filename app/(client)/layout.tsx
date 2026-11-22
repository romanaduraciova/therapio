import type { ReactNode } from 'react';

const ClientLayout = ({ children }: { children: ReactNode }) => (
	<main className="flex-1">{children}</main>
);

export default ClientLayout;
