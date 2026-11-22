'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect } from 'react';

type ErrorPageProps = {
	error: unknown;
	retry: () => void;
};

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
			<Image
				src="/error.svg"
				alt="error illustration"
				width={320}
				height={248}
				loading="eager"
				className="h-auto w-80"
			/>
			<h1 className="font-heading text-2xl font-bold">Something went wrong</h1>
			<Button onClick={() => retry()}>Try again</Button>
		</main>
	);
};

export default ErrorPage;
