import { buttonVariants } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

const NotFound = () => (
	<main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
		<Image
			src="/not-found.svg"
			alt="not found illustration"
			width={320}
			height={212}
			className="h-auto w-80"
		/>
		<h1 className="font-heading text-2xl font-bold">Page not found</h1>
		<p className="text-muted-foreground">
			The page you are looking for doesn&apos;t exist.
		</p>
		<Link href="/" className={buttonVariants()}>
			Back to home
		</Link>
	</main>
);

export default NotFound;
