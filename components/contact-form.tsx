'use client';

import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	type ContactMessageInput,
	contactMessageSchema
} from '@/modules/contact/schema';
import { sendContactMessageAction } from '@/server/contact/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const ContactForm = () => {
	const form = useForm<ContactMessageInput>({
		resolver: zodResolver(contactMessageSchema),
		mode: 'onTouched',
		defaultValues: { name: '', email: '', message: '' }
	});
	const { errors, isSubmitting } = form.formState;

	const onSubmit = async (values: ContactMessageInput) => {
		const result = await sendContactMessageAction(values);

		if (!result.ok) {
			toast.error('Sending failed. Please try again.');
			return;
		}

		toast.success('Message sent');
		form.reset();
	};

	return (
		<FormProvider {...form}>
			<form
				noValidate
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<FormField name="name" label="Name">
					<Input
						id="name"
						autoComplete="name"
						aria-invalid={!!errors.name}
						className="bg-accent px-3"
						{...form.register('name')}
					/>
				</FormField>
				<FormField name="email" label="E-mail">
					<Input
						id="email"
						type="email"
						autoComplete="email"
						aria-invalid={!!errors.email}
						className="bg-accent px-3"
						{...form.register('email')}
					/>
				</FormField>
				<FormField name="message" label="Message">
					<Textarea
						id="message"
						rows={6}
						placeholder="How can I help you?"
						aria-invalid={!!errors.message}
						className="bg-accent min-h-40 px-3"
						{...form.register('message')}
					/>
				</FormField>
				<Button type="submit" disabled={isSubmitting} className="self-start">
					Send
				</Button>
			</form>
		</FormProvider>
	);
};
