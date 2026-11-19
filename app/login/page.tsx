'use client';

import Link from 'next/link';
import { toast } from 'sonner';

const LoginPage = () => {
	toast.error('Not logged in!');
	return (
		<>
			<h1>Login page</h1>
			<Link href="/">Go back home</Link>
		</>
	);
};

export default LoginPage;
