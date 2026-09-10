import { motion } from "motion/react";
import { cardVariants, techTagVariants } from "@/lib/card-variants";
import type { Project, ProjectsCarouselProps } from "../../../types/project";


export default function ProjectsCarousel({ projects, t, locale }: ProjectsCarouselProps) {
	// Early return if no projects
	if (!projects || projects.length === 0) {
		return (
			<section className="my-10 md:mx-auto  relative w-full xl:w-11/12">
				<h1 className="text-3xl mb-2">{t.title}</h1>
				<p className="text-lg">{t.no_projects}</p>
			</section>
		);
	}

	// Helper function to get project type translation
	const getProjectTypeTranslation = (type: string) => {
		switch (type) {
			case "web":
				return t.web;
			case "mobile":
				return t.mobile;
			case "web / mobile":
				return t.both;
			default:
				return type;
		}
	};

	// Helper function to get project URL with locale
	const getProjectUrl = (slug: string) => {
		return locale === 'en' ? `/projects/${slug}` : `/${locale}/projects/${slug}`;
	};

	// Determine visible projects (max 4) and whether there are more
	const maxVisible = 3;
	const hasMore = projects.length > maxVisible;
	const visibleProjects: Project[] = hasMore ? projects.slice(0, maxVisible) : projects;
	const allProjectsUrl = locale === 'en' ? '/projects/' : `/${locale}/projects/`;

	return (
		<section id="projects" className="my-10 text-foreground md:mx-auto  relative w-full xl:w-11/12 bg-transparent scroll-mt-24">
			<section className="w-full">
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
				   <div className="overflow-x-scroll flex gap-6 py-4 hide-scrollbar">
					{visibleProjects.map((project, index) => {
						return (
							/* the project card */
							<motion.div key={project._id} className={cardVariants()}>
								<a href={getProjectUrl(project.slug.current)} className="w-full h-full flex flex-col relative">
									<div className="p-4 grow">
										{/* project number and type */}
										<div className="flex justify-between">
											<h2 className="text-2xl">O{index + 1}</h2>
											<p className="text-sm my-auto">
												{getProjectTypeTranslation(project.projectType || '')}
											</p>
										</div>

										{/* project title */}
										<p className="text-2xl">{project.title}</p>

										{/* project description */}
										<div className="text-sm mt-2">
											<p>{project.shortDescription || (typeof project.description === 'string' ? project.description : '')}</p>
										</div>
									</div>

									{/* tech stack tags */}
									{project.technologies && project.technologies.length > 0 && (
										<div className="flex flex-wrap-reverse gap-1 p-1 mr-1 mb-1 h-14 justify-end">
											{project.technologies.slice(0, 4).map((tech: string, i: number) => (
												<span key={i} className={techTagVariants()}>
													{tech}
												</span>
												))}
										</div>
									)}
								</a>
							</motion.div>
						);
					})}

					{/* See all projects card */}
					{hasMore && (
						<motion.div className={cardVariants()}>
							<a href={allProjectsUrl} className="w-full h-full flex flex-col justify-center items-center gap-2 p-4">
								<p className="text-xl font-semibold text-center">{t.see_all}</p>
							</a>
						</motion.div>
					)}
					</div>
			</section>
		</section>
	);
}