import { ContactForm } from '@/components/contact-form';
import { Mail, MapPin, Smartphone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Contact' };

const contactDetails = {
	name: 'Mgr. Jana Nováková',
	address: 'Botanická 247, 612 00 Brno',
	phone: '+420 247 247 247',
	email: 'terapeutka@pv247.cz'
};

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(contactDetails.address)}&output=embed`;

const ContactPage = () => (
	<div className="flex flex-col gap-6 py-8">
		<h1 className="font-heading text-4xl font-bold">Contact</h1>

		<div className="grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
			<section className="bg-card flex flex-col gap-6 border p-8">
				<h2 className="font-heading text-3xl font-bold">Send a message</h2>
				<ContactForm />
			</section>

			<section className="bg-accent flex flex-col gap-6 border p-8">
				<ul className="flex flex-col gap-4">
					<li className="mb-6 flex items-center gap-3 text-xl font-bold">
						{contactDetails.name}
					</li>
					<li className="flex items-center gap-3">
						<MapPin className="size-5 shrink-0" />
						{contactDetails.address}
					</li>
					<li className="flex items-center gap-3">
						<Smartphone className="size-5 shrink-0" />
						<a
							href={`tel:${contactDetails.phone.replaceAll(' ', '')}`}
							className="hover:underline"
						>
							{contactDetails.phone}
						</a>
					</li>
					<li className="flex items-center gap-3">
						<Mail className="size-5 shrink-0" />
						<a
							href={`mailto:${contactDetails.email}`}
							className="hover:underline"
						>
							{contactDetails.email}
						</a>
					</li>
				</ul>
				<iframe
					src={mapSrc}
					title={`Map: ${contactDetails.address}`}
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					className="aspect-4/3 w-full border"
				/>
			</section>
		</div>
	</div>
);

export default ContactPage;
