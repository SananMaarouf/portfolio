import React, { useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { ProjectPreview } from "@/lib/sanity/types";

interface ProjectsCarouselProps {
	projects: ProjectPreview[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
	const ref = useRef<HTMLDivElement>(null);
	const { t, i18n } = useTranslation();

	// Early return if no projects
	if (!projects || projects.length === 0) {
		return (
			<section className="my-10 md:mx-auto font-silkscreen relative w-full xl:w-10/12">
				<h1 className="text-3xl mb-2">{t("projects.title")}</h1>
				<p className="text-lg">No projects available at the moment.</p>
			</section>
		);
	}

	// Helper function to get project type translation
	const getProjectTypeTranslation = (type: string) => {
		switch (type) {
			case "web":
				return t('projectsTypes.web');
			case "mobile":
				return t('projectsTypes.mobile');
			case "web / mobile":
				return t('projectsTypes.both');
			default:
				return type;
		}
	};

	// Helper function to get localized description
	const getLocalizedDescription = (description: any) => {
		if (!description) return '';
		if (typeof description === 'string') return description;

		// Handle i18n object structure
		const currentLocale = i18n.language || 'en';
		return description[currentLocale] || description.en || '';
	};

	return (
		<motion.section
			ref={ref}
			initial={{ opacity: 0, y: 200 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 1 }}
			className="my-10 md:mx-auto font-silkscreen relative w-full xl:w-10/12"
		>
			{/* indicate to user */}
			<h1 className="text-3xl mb-2">{t("projects.title")}</h1>
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
			<div className="overflow-x-scroll flex gap-6 py-4">
				{projects.map((project, index) => {
					return (
						<motion.div
							key={project._id}
							className="group shrink-0 w-72 h-56 bg-white rounded-xl transition duration-300 ease-linear hover:bg-deco
								text-deco"
						>
							<Link
								href={`/projects/${project.slug.current}`}
								className="hover:text-white w-full h-full flex flex-col relative"
							>
								<div className="p-4 flex-grow">
									{/* project number and type */}
									<div className="flex justify-between">
										<h2 className="text-2xl">O{index + 1}</h2>
										<p className="text-sm my-auto">
											{getProjectTypeTranslation(project.projectType)}
										</p>
									</div>

									{/* project title */}
									<p className="text-2xl">{project.title}</p>

									{/* project description */}
									<div className="text-sm mt-2">
										<p>{project.shortDescription || getLocalizedDescription(project.description)}</p>
									</div>
								</div>

								{/* tech stack tags */}
								{project.technologies && project.technologies.length > 0 && (
									<div className="flex flex-wrap-reverse gap-1 p-1 mr-1 mb-1 h-14 justify-end">
										{project.technologies.slice(0, 4).map((tech: string, i: number) => (
											<span
												key={i}
												className="bg-deco text-white h-6 text-xs rounded-md p-1 group-hover:bg-white group-hover:text-deco"
											>
												{tech}
											</span>
										))}
									</div>
								)}
							</Link>
						</motion.div>
					);
				})}
			</div>
		</motion.section>
	);
}