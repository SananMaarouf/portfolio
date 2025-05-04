import React, { useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function ProjectsCarousel() {
	const ref = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const projects = [
		{
			number: "O1",
			alt: "Dubistro",
			title: "Dubistro",
			description: t('projectsDescriptions.dubistro'),
			url: "/projects/dubistro",
			src: "/projects/dubistro.png",
			type: t('projectsTypes.web'),
			tech: ["React", "Next.js", "TailwindCSS", "Sanity-CMS"],
		},
		{
			number: "O2",
			alt: "Applitrack",
			title: "Applitrack",
			description: t('projectsDescriptions.applitrack'),
			url: "/projects/applitrack",
			src: "/projects/applitrack.webp",
			type: t('projectsTypes.web'),
			tech: ["React", "Next.js", "TailwindCSS", "SupaBase"],
		},
		{
			number: "O3",
			alt: "Partner SOS",
			title: "Partner-SOS",
			description: t('projectsDescriptions.partnersos'),
			url: "/projects/partnersos",
			src: "/projects/psos.webp",
			type: t('projectsTypes.both'),
			tech: ["React Native", "React", "Next.js", "TailwindCSS", "Firebase"],
		},
		{
			number: "O4",
			alt: "SanPlan",
			title: "SanPlan",
			description: t('projectsDescriptions.sanplan'),
			url: "/projects/sanplan",
			src: "/projects/sanplan.webp",
			type: t('projectsTypes.mobile'),
			tech: ["React Native", "Expo Go", "SQLite",],
		},
		{
			number: "O5",
			alt: "Sarazamecznik.com",
			title: "Zamec",
			description: t('projectsDescriptions.sara'),
			url: "/projects/sara",
			src: "/projects/zamec.webp",
			type: t('projectsTypes.web'),
			tech: ["React", "Next.js", "TailwindCSS", "Contentful-CMS"],
		},
		{
			number: "O6",
			alt: "Greentalk",
			title: "Greentalk",
			description: t('projectsDescriptions.greentalk'),
			url: "/projects/greentalk",
			src: "/projects/greentalk.webp",
			type: t('projectsTypes.web'),
			tech: ["PHP", "HTML", "CSS", "JS", "MySQL"],
		}
	];

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
				{projects.map((project, index) => (
					<motion.div key={index}
						className="group shrink-0 w-72 h-56 bg-white rounded-xl transition duration-300 ease-linear hover:bg-deco 
							text-deco">
						<Link href={project.url} className="hover:text-white w-full h-full flex flex-col relative">
							<div className="p-4 flex-grow">
								{/* project number and type  */}
								<div className="flex justify-between">
									<h2 className="text-2xl">{project.number}</h2>
									<p className="text-sm my-auto">{project.type}</p>
								</div>

								{/* project title */}
								<p className="text-2xl">{project.title}</p>
								{/* project description */}
								<div className="text-sm mt-2">
									<p>{project.description}</p>
								</div>

							</div>

							{/* tech stack tags */}
							<div className="flex flex-wrap-reverse gap-1 p-1 mr-1 mb-1 h-14 justify-end">
								{project.tech.map((tech, i) => (
									<span key={i} className="bg-deco text-white h-6 text-xs rounded-md p-1 group-hover:bg-white group-hover:text-deco">
										{tech}
									</span>
								))}
							</div>

						</Link>
					</motion.div>
				))}
			</div>
		</motion.section>
	);
}