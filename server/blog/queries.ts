import 'server-only';
import { db } from '@/db';
import { blogTags } from '@/modules/blog/tags';
import { cacheLife, cacheTag } from 'next/cache';

// TODO: Just a helping function, can be deleted
export const getLatestPosts = async (limit: number) => {
	'use cache';
	cacheTag(blogTags.posts);
	cacheLife('max');

	return await db.query.post.findMany({
		where: (post, { eq }) => eq(post.published, true),
		columns: { slug: true, title: true, content: true, publishedAt: true },
		with: { category: { columns: { name: true } } },
		orderBy: (post, { desc }) => [desc(post.publishedAt)],
		limit
	});
};
