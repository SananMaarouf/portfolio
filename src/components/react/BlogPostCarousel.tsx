import React, { useRef } from "react";
import { motion } from "motion/react";
import type { Post } from "../../../types/post";

interface BlogPostCarouselProps {
	posts: Post[];
	t: {
		title: string;
		no_posts: string;
		see_all: string;
	};
	locale: string;
}

export default function BlogPostCarousel({ posts, t, locale }: BlogPostCarouselProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Early return if no posts
	if (!posts || posts.length === 0) {
		return (
			<section className="my-10 md:mx-auto  relative w-full xl:w-10/12">
				<h1 className="text-3xl mb-2">{t.title}</h1>
				<p className="text-lg">{t.no_posts}</p>
			</section>
		);
	}

	// Helper function to format date
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString(locale === 'nb' ? 'nb-NO' : 'en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	// Helper function to get post URL with locale
	const getPostUrl = (slug: string) => {
		return locale === 'en' ? `/post/${slug}` : `/${locale}/post/${slug}`;
	};

	// Determine visible posts (max 3) and whether there are more
	const maxVisible = 3;
	const hasMore = posts.length > maxVisible;
	const visiblePosts: Post[] = hasMore ? posts.slice(0, maxVisible) : posts;
	const allPostsUrl = locale === 'en' ? '/posts/' : `/${locale}/posts/`;

	return (
		<section id="posts" className="my-10 text-foreground md:mx-auto  relative w-full xl:w-10/12 bg-transparent scroll-mt-24">
			<motion.section
				ref={ref}
				initial={{ opacity: 0, y: 200 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 1 }}
				className="w-full"
			>
				{/* indicate to user */}
				<h1 className="text-3xl mb-2">{t.title}</h1>
				<motion.p
					animate={{ scale: [1, 1.1, 1] }}
					transition={{ repeat: 10, duration: 2 }}
					className="block xl:hidden absolute right-2 top-2"
				>
					swipe ➡️
				</motion.p>
				<motion.p
					animate={{ scale: [1, 1.1, 1] }}
					transition={{ repeat: 10, duration: 2 }}
					className="hidden xl:block absolute right-2 top-2"
				>
					scroll ➡️
				</motion.p>

				{/* horizontal slider */}
				<div className="overflow-x-scroll flex gap-6 py-4 scrollbar-hide">
					{visiblePosts.map((post, index) => {
						return (
							/* the post card */
							<motion.div key={post.slug.current} className="
							group shrink-0 w-72 h-56 
							bg-card hover:bg-foreground rounded-xl text-card-foreground 
							transition-all duration-300 
							ease-linear dark:hover:bg-card-foreground dark:hover:text-card">
								<a href={getPostUrl(post.slug.current)} className="w-full h-full flex flex-col relative">
									<div className="p-4 grow">
										{/* post number and date */}
										<div className="flex justify-between">
											<h2 className="text-2xl">O{index + 1}</h2>
											<p className="text-xs my-auto">
												{post.publishedAt && formatDate(post.publishedAt)}
											</p>
										</div>

										{/* post title */}
										<p className="text-xl mt-2 line-clamp-2">{post.title}</p>

										{/* post excerpt */}
										<div className="text-sm mt-2">
											<p className="line-clamp-3">{post.excerpt}</p>
										</div>
									</div>
								</a>
							</motion.div>
						);
					})}

					{/* See all posts card */}
					{hasMore && (
						<motion.div className="group shrink-0 w-72 h-56 bg-card hover:bg-foreground rounded-xl text-card-foreground transition-all duration-300 ease-linear dark:hover:bg-card-foreground dark:hover:text-card flex">
							<a href={allPostsUrl} className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
								<p className="text-xl font-semibold">{t.see_all}</p>
								<span className="text-sm opacity-80">{posts.length} total</span>
							</a>
						</motion.div>
					)}
				</div>
			</motion.section>
		</section>
	);
}
