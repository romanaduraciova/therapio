import { z } from 'zod';

export const contactMessageSchema = z.object({
	name: z.string().trim().min(1, 'Enter your name'),
	email: z.email('Enter a valid e-mail'),
	message: z.string().trim().min(1, 'Enter a message')
});
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
