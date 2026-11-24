import { GitHubSignInButton } from '@/components/github-sign-in-button';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Sign in' };

const LoginPage = () => (
	<div className="flex justify-center py-16">
		<div className="bg-card flex w-full max-w-md flex-col items-center gap-6 border p-8 text-center sm:p-12">
			<div className="flex flex-col gap-2">
				<h1 className="font-heading text-3xl font-bold">Sign in</h1>
				<p className="text-muted-foreground">Sign in to book sessions</p>
			</div>
			<GitHubSignInButton />
		</div>
	</div>
);

export default LoginPage;
