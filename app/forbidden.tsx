import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Access denied' };

const Forbidden = () => (
	<main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
		<Image
			src="/error.svg"
			alt="access denied illustration"
			width={320}
			height={212}
			loading="eager"
			className="h-auto w-80"
		/>
		<h1 className="font-heading text-2xl font-bold">Access denied</h1>
		<p className="text-muted-foreground">
			You don&apos;t have permission to view this page.
		</p>
		<Button nativeButton={false} render={<Link href="/" />}>
			Back to home
		</Button>
	</main>
);

export default Forbidden;
