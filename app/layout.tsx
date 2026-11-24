import { Providers } from '@/app/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist_Mono, Noto_Sans, Playfair_Display } from 'next/font/google';

const playfairDisplayHeading = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-heading'
});

const notoSans = Noto_Sans({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono'
});

export const metadata: Metadata = {
	title: { template: '%s | Therapio', default: 'Therapio' },
	description: 'A therapist booking system.'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				'h-full',
				'antialiased',
				'font-sans',
				notoSans.variable,
				geistMono.variable,
				playfairDisplayHeading.variable
			)}
		>
			<body className="flex min-h-full flex-col">
				<ThemeProvider attribute="class" defaultTheme="light">
					<Providers>
						<TooltipProvider>
							{children}
							<Toaster richColors position="bottom-right" />
						</TooltipProvider>
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}
