import React, { useRef } from "react";
import { motion } from "motion/react";
import type { Project } from "../../../types/project";

interface ProjectsCarouselProps {
	projects: Project[];
	t: {
		title: string;
		web: string;
		mobile: string;
		both: string;
		no_projects: string;
	};
	locale: string;
}

export default function ProjectsCarousel({ projects, t, locale }: ProjectsCarouselProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Early return if no projects
	if (!projects || projects.length === 0) {
		return (
			<section className="my-10 md:mx-auto font-silkscreen relative w-full xl:w-10/12">
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
		return locale === 'en' ? `/project/${slug}` : `/${locale}/project/${slug}`;
	};

	return (
		<section id="projects" className="my-10 text-foreground md:mx-auto font-silkscreen relative w-full xl:w-10/12 bg-transparent scroll-mt-24">
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
					{projects.map((project, index) => {
						return (
							/* the project card */
							<motion.div key={project._id} className="
							group shrink-0 w-72 h-56 
							bg-card hover:bg-foreground rounded-xl text-card-foreground 
							transition-all duration-300 
							ease-linear dark:hover:bg-card-foreground dark:hover:text-card">
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
												<span key={i} className="
													bg-card-foreground 
													transition-all duration-300 text-primary 
													h-6 text-xs rounded-md p-1 
													group-hover:bg-primary group-hover:text-primary-foreground">
													{tech}
												</span>
											))}
										</div>
									)}
								</a>
							</motion.div>
						);
					})}
				</div>
			</motion.section>
		</section>
	);
}