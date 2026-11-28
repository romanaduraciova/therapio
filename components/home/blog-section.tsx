import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { APP_TIME_ZONE } from '@/lib/datetime';
import { getLatestPosts } from '@/server/blog/queries';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const BlogSection = async () => {
	const posts = await getLatestPosts(3);

	if (posts.length === 0) return null;

	return (
		<section className="mb-12 flex flex-col gap-6 md:mb-20">
			<div className="flex flex-wrap items-end justify-between gap-x-4">
				<h2 className="font-heading text-2xl font-bold md:text-3xl">
					From the blog
				</h2>
				<Button
					variant="link"
					className="px-0"
					nativeButton={false}
					render={<Link href="/blog" />}
				>
					All articles
					<ArrowRight data-icon="inline-end" />
				</Button>
			</div>
			<div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
				{posts.map(post => (
					<Link key={post.slug} href={`/blog/${post.slug}`}>
						<Card className="hover:bg-muted/50 h-full transition-colors">
							<CardHeader>
								<div className="flex gap-2">
									{post.category && (
										<Badge variant="default">{post.category.name}</Badge>
									)}
									{post.publishedAt && (
										<Badge variant="secondary">
											{post.publishedAt.toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'short',
												day: 'numeric',
												timeZone: APP_TIME_ZONE
											})}
										</Badge>
									)}
								</div>
								<CardTitle className="text-xl font-bold tracking-normal normal-case">
									{post.title}
								</CardTitle>
								<CardDescription className="line-clamp-3">
									{post.content}
								</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
};
