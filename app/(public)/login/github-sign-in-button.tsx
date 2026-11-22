'use client';

import { GitHubIcon } from '@/components/icons/github-icon';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { signIn } from '@/lib/auth-client';
import { useState } from 'react';
import { toast } from 'sonner';

const getCallbackPath = () => {
	const callbackUrl = new URLSearchParams(window.location.search).get(
		'callbackUrl'
	);
	if (!callbackUrl) return '/';

	const url = new URL(callbackUrl, window.location.origin);
	if (url.origin !== window.location.origin) return '/';

	return url.pathname + url.search + url.hash;
};

export const GitHubSignInButton = () => {
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		const { error } = await signIn.social({
			provider: 'github',
			callbackURL: getCallbackPath()
		});
		if (error) {
			toast.error('Sign in failed. Please try again.');
			setLoading(false);
		}
	};

	return (
		<Button
			size="lg"
			className="w-full"
			onClick={handleClick}
			disabled={loading}
		>
			{loading ? <Spinner /> : <GitHubIcon />}
			Continue with GitHub
		</Button>
	);
};
