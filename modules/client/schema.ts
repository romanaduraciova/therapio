import { z } from 'zod';

export const clientIdSchema = z.object({ clientId: z.string().min(1) });
export type ClientIdInput = z.infer<typeof clientIdSchema>;

export const clientActionErrors = [
	'UNAUTHORIZED',
	'FORBIDDEN',
	'INVALID_INPUT',
	'CLIENT_NOT_FOUND',
	'NOTE_NOT_FOUND'
] as const;
export type ClientActionErrorCode = (typeof clientActionErrors)[number];

export type ClientActionResult<T = Record<never, never>> =
	| ({ ok: true } & T)
	| { ok: false; error: ClientActionErrorCode };

export const noteIdSchema = z.object({ noteId: z.uuid() });
export type NoteIdInput = z.infer<typeof noteIdSchema>;

const noteFieldsSchema = z.object({
	text: z.string().trim().min(1, 'Note cannot be empty').max(10_000),
	noteDate: z.date().optional()
});

export const createNoteSchema = z.intersection(
	clientIdSchema,
	noteFieldsSchema
);
export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.intersection(noteIdSchema, noteFieldsSchema);
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;

export type CreateNoteResult = ClientActionResult<{ noteId: string }>;
