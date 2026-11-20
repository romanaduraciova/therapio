import { relations } from 'drizzle-orm';

import { account } from './account';
import { availabilityBlock } from './availabilityBlock';
import { booking } from './booking';
import { bookingType } from './bookingType';
import { category } from './category';
import { clientNote } from './clientNote';
import { post } from './post';
import { session } from './session';
import { user } from './user';

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	clientNotes: many(clientNote),
	bookings: many(booking)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));

export const clientNoteRelations = relations(clientNote, ({ one }) => ({
	client: one(user, {
		fields: [clientNote.clientId],
		references: [user.id]
	})
}));

export const bookingRelations = relations(booking, ({ one }) => ({
	client: one(user, {
		fields: [booking.clientId],
		references: [user.id]
	}),
	bookingType: one(bookingType, {
		fields: [booking.bookingTypeId],
		references: [bookingType.id]
	}),
	availabilityBlock: one(availabilityBlock, {
		fields: [booking.availabilityBlockId],
		references: [availabilityBlock.id]
	})
}));

export const bookingTypeRelations = relations(bookingType, ({ many }) => ({
	bookings: many(booking)
}));

export const availabilityBlockRelations = relations(
	availabilityBlock,
	({ many }) => ({
		bookings: many(booking)
	})
);

export const categoryRelations = relations(category, ({ many }) => ({
	posts: many(post)
}));

export const postRelations = relations(post, ({ one }) => ({
	category: one(category, {
		fields: [post.categoryId],
		references: [category.id]
	})
}));
