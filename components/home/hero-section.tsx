import { BlobShape } from '@/components/blob-shape';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Map, MapPin, Pin, PinIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '../ui/badge';

export const HeroSection = () => (
	<section className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-8">
		<div className="flex flex-col gap-6 md:gap-">
			<h1 className="font-heading text-5xl leading-none font-bold tracking-tight sm:text-6xl lg:text-7xl">
				Therapy that gives you space
			</h1>

			<Badge variant="outline" className="mb-4">
				<MapPin className="mr-2 size-4" />
				Botanická 247, Brno
			</Badge>

			<div className="flex flex-wrap gap-3">
				<Button
					size="lg"
					nativeButton={false}
					render={<Link href="/contact" />}
				>
					<HeartHandshake className="mr-2 size-4" />
					Get in touch
				</Button>
				<Button
					variant="outline"
					size="lg"
					nativeButton={false}
					render={<Link href="/pricing" />}
				>
					Pricing
				</Button>
			</div>
		</div>
		<div className="relative isolate hidden aspect-square w-full items-center justify-center p-14 md:flex">
			<BlobShape className="text-muted" />
			<Image
				src="/meditation.svg"
				alt="Person meditating in a calm pose"
				width={959}
				height={703}
				preload
				className="h-auto w-full"
			/>
		</div>
	</section>
);
