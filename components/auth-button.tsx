'use client';

import { signIn, signOut, useSession } from '@/lib/auth-client';
import { LogOut, ScanFace } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export const AuthButton = () => {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);

		if (session) {
			await signOut({ fetchOptions: { onSuccess: () => router.refresh() } });
			setLoading(false);
		} else {
			const { error } = await signIn.social({
				provider: 'github',
				callbackURL: '/'
			});
			if (error) setLoading(false);
		}
	};

	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						size="icon-sm"
						onClick={handleClick}
						disabled={isPending || loading}
					>
						{session ? <LogOut /> : <ScanFace />}
					</Button>
				}
			/>
			<TooltipContent>
				<p>{session ? 'Sign out' : 'Sign in with GitHub'}</p>
			</TooltipContent>
		</Tooltip>
	);
};
