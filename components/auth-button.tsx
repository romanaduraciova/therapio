'use client';

import { signOut, useSession } from '@/lib/auth-client';
import { LogIn, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';

export const AuthButton = () => {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		if (!session) {
			router.push('/login');
			return;
		}

		setLoading(true);
		await signOut({
			fetchOptions: {
				onSuccess: () => {
					toast.success('Signed out');
					router.refresh();
				},
				onError: () => {
					toast.error('Sign out failed. Please try again.');
				}
			}
		});
		setLoading(false);
	};

	return (
		<Button
			size="sm"
			className="gap-2"
			onClick={handleClick}
			disabled={isPending || loading}
		>
			{session ? (
				<>
					<LogOut data-icon="inline-start" />
					Sign out
				</>
			) : (
				<>
					<LogIn data-icon="inline-start" />
					Sign in
				</>
			)}
		</Button>
	);
};
