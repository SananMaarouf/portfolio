import Landing from "../components/landing";
import ProjectsCarousel from "../components/projectsCarousel";
import Toolbox from "../components/toolbox";
import { motion } from "motion/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { client } from "@/lib/sanity/client";
import type { ProjectPreview } from "@/lib/sanity/types";

// GROQ query to fetch projects for the carousel
const PROJECTS_CAROUSEL_QUERY = `*[_type == "project" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  slug,
  description,
  shortDescription,
  date,
  technologies,
  projectType,
}`;

interface HomeProps {
  projects: ProjectPreview[];
}

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    const projects = await client.fetch(PROJECTS_CAROUSEL_QUERY);

    return {
      props: {
        projects: projects || [],
        ...(await serverSideTranslations(locale)),
      },
      revalidate: 60, // Revalidate every minute
    };
  } catch (error) {
    console.error('Error fetching projects:', error);

    return {
      props: {
        projects: [],
        ...(await serverSideTranslations(locale)),
      },
      revalidate: 60,
    };
  }
}

export default function Home({ projects }: HomeProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col w-full md:w-10/12 mx-auto"
    >
      {/* Landing */}
      <Landing />
      {/* Projects */}
      <div id="projects">
        <ProjectsCarousel projects={projects} />
      </div>
      {/* Technologies */}
      <Toolbox />
    </motion.main>
  );
}