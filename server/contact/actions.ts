'use server';

import {
	type ContactMessageInput,
	contactMessageSchema
} from '@/modules/contact/schema';

export const sendContactMessageAction = async (
	input: ContactMessageInput
): Promise<{ ok: boolean }> => {
	const parsed = contactMessageSchema.safeParse(input);

	// TODO: deliver the message to the therapist by e-mail
	return { ok: parsed.success };
};
