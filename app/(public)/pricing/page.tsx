import { buttonVariants } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import { getActiveBookingTypes } from '@/server/bookings/queries';
import { Info } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pricing' };

const PricingPage = async () => {
	const bookingTypes = await getActiveBookingTypes();

	return (
		<div className="flex max-w-3xl flex-col gap-6 py-8">
			<div className="flex flex-col gap-2">
				<h1 className="font-heading text-4xl font-bold">Pricing</h1>
			</div>

			<div className="border">
				<Table>
					<TableHeader className="bg-muted/50">
						<TableRow>
							<TableHead>Session</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead className="text-right">Price</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{bookingTypes.map(type => (
							<TableRow key={type.id}>
								<TableCell className="py-5 font-semibold">
									{type.name}
								</TableCell>
								<TableCell className="py-5">{type.durationMin} min</TableCell>
								<TableCell className="py-5 text-right font-semibold">
									{type.priceCzk} CZK
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<p className="text-muted-foreground flex items-center gap-2">
				<Info className="size-4 shrink-0" />
				Payment is by bank transfer, you will find the details with your
				booking.
			</p>

			<Link
				href="/contact"
				className={buttonVariants({ className: 'self-start' })}
			>
				Get in touch
			</Link>
		</div>
	);
};

export default PricingPage;
