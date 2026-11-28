'use server';

import { db } from '@/db';
import { clientNote, user } from '@/db/schema';
import {
	type ClientActionResult,
	type ClientIdInput,
	type CreateNoteInput,
	type CreateNoteResult,
	type NoteIdInput,
	type UpdateNoteInput,
	clientIdSchema,
	createNoteSchema,
	noteIdSchema,
	updateNoteSchema
} from '@/modules/client/schema';
import {
	type ClientDetails,
	type Clients,
	getClientDetails,
	getClients
} from '@/server/clients/queries';
import { getCurrentUser } from '@/server/session';
import { and, eq } from 'drizzle-orm';

const authorizeTherapist = async () => {
	const user = await getCurrentUser();

	if (!user) {
		return 'UNAUTHORIZED' as const;
	}

	return user.role === 'therapist' ? null : ('FORBIDDEN' as const);
};

export const getClientsAction = async (): Promise<
	ClientActionResult<{ clients: Clients }>
> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	return { ok: true, clients: await getClients() };
};

export const getClientDetailsAction = async (
	input: ClientIdInput
): Promise<ClientActionResult<{ client: ClientDetails }>> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = clientIdSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const client = await getClientDetails(parsed.data.clientId);

	if (!client) {
		return { ok: false, error: 'CLIENT_NOT_FOUND' };
	}

	return { ok: true, client };
};

export const createClientNoteAction = async (
	input: CreateNoteInput
): Promise<CreateNoteResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = createNoteSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const { clientId, text, noteDate } = parsed.data;

	const [client] = await db
		.select({ id: user.id })
		.from(user)
		.where(and(eq(user.id, clientId), eq(user.role, 'client')))
		.limit(1);

	if (!client) {
		return { ok: false, error: 'CLIENT_NOT_FOUND' };
	}

	const [created] = await db
		.insert(clientNote)
		.values({ clientId, text, noteDate: noteDate ?? new Date() })
		.returning({ id: clientNote.id });

	return { ok: true, noteId: created.id };
};

export const updateClientNoteAction = async (
	input: UpdateNoteInput
): Promise<ClientActionResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = updateNoteSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const { noteId, text, noteDate } = parsed.data;

	const [updated] = await db
		.update(clientNote)
		.set({ text, ...(noteDate ? { noteDate } : {}) })
		.where(eq(clientNote.id, noteId))
		.returning({ id: clientNote.id });

	if (!updated) {
		return { ok: false, error: 'NOTE_NOT_FOUND' };
	}

	return { ok: true };
};

export const deleteClientNoteAction = async (
	input: NoteIdInput
): Promise<ClientActionResult> => {
	const denied = await authorizeTherapist();

	if (denied) {
		return { ok: false, error: denied };
	}

	const parsed = noteIdSchema.safeParse(input);

	if (!parsed.success) {
		return { ok: false, error: 'INVALID_INPUT' };
	}

	const [deleted] = await db
		.delete(clientNote)
		.where(eq(clientNote.id, parsed.data.noteId))
		.returning({ id: clientNote.id });

	if (!deleted) {
		return { ok: false, error: 'NOTE_NOT_FOUND' };
	}

	return { ok: true };
};
