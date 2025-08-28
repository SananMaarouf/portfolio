import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { client } from "@/lib/sanity/client";
import { useTranslation } from 'next-i18next';
import type { Project } from "@/lib/sanity/types";
import { urlFor } from "@/lib/sanity/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import ExperienceAccordion from "@/components/experienceAccordion";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// GROQ queries
const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`;

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  shortDescription,
  date,
  version,
  heroImage,
  gallery,
  technologies,
  projectType,
  body,
  githubUrl,
  liveUrl,
  featured,
  Experience
}`;

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const { i18n } = useTranslation();

  // Helper function to get localized text
  const getLocalizedText = (text: any) => {
    if (!text) return '';
    if (typeof text === 'string') return text;

    // Handle i18n object structure
    const currentLocale = i18n.language || 'en';
    return text[currentLocale] || text.en || '';
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Project not found</p>
      </div>
    );
  }

  const heroImageUrl = project.heroImage
    ? urlFor(project.heroImage).width(800).height(600).url()
    : null;

  return (
    <section className="px-5 md:px-0">
      {/* Hero section */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full mx-auto my-5 flex flex-col
          border-white overflow-hidden rounded-2xl
          border border-transparent bg-transparent
          md:w-3/5 lg:w-1/2
        "
      >
        <div className="w-full font-bold flex bg-white text-deco flex-col px-4 pb-2">
          <div className="flex flex-row">
            <div className="flex-1 w-full">
              <h1 className="text-3xl md:text-4xl lg:text-5xl pt-4">
                {project.title}
              </h1>
              {project.shortDescription && (
                <p className="mt-2 text-md md:mt-4 md:text-lg lg:text-xl">
                  {project.shortDescription}
                </p>
              )}
              <p className="mt-2 text-sm md:mt-4 md:text-lg lg:text-xl">
                {new Date(project.date).toLocaleDateString()}
              </p>
              {project.projectType && (
                <p className="mt-2 text-sm md:mt-4 md:text-lg lg:text-xl">
                  Type: {project.projectType}
                </p>
              )}
            </div>
            {project.version && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: 3, duration: 2 }}
                className="w-1/6 text-2xl text-end"
              >
                {project.version}
              </motion.div>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {heroImageUrl && (
          <div className="w-full">
            <Image
              src={heroImageUrl}
              alt={project.title}
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-xl font-chakra font-bold mb-10"
      >
        {/* Description */}
        {project.description && (
          <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
            <p>{getLocalizedText(project.description)}</p>
          </section>
        )}



        {/* Experience Accordion */}
        {project.Experience && project.Experience.length > 0 && (
          <div className="mx-auto md:w-3/5 lg:w-1/2">
            <ExperienceAccordion
              experiences={project.Experience}
              title="Experience"
            />
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4 underline">Gallery</h3>
            <div className="w-full rounded-lg bg-gray-600">
              <Carousel>
                <CarouselPrevious />
                <CarouselContent>
                  {project.gallery.map((image: any, index: number) => {
                    const imageUrl = urlFor(image).width(600).height(400).url();
                    return (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/5">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={image.title || `Gallery image ${index + 1}`}
                            width={600}
                            height={400}
                            className="mx-auto rounded"
                          />
                        )}
                        {image.title && (
                          <p className="text-center text-sm mt-2">{image.title}</p>
                        )}
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselNext />
              </Carousel>
            </div>
          </section>
        )}

        {/* Body content */}
        {project.body && (
          <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
            <div className="text-lg leading-relaxed whitespace-pre-wrap">
              {getLocalizedText(project.body)}
            </div>
          </section>
        )}

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
            <div className="flex gap-4">
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group px-4 py-2 bg-deco flex flex-row items-center align-center gap-2
                    text-white rounded
                    hover:bg-card hover:text-deco
                    transition-colors duration-200"
                >
                  View on GitHub
                  <span className="text-sm">
                  {/* github svg */}
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-white group-hover:text-deco transition-colors duration-200"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                 </span>

                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-deco text-white rounded hover:opacity-90 transition-opacity"
                >
                  View Live Site
                </Link>
              )}
            </div>
          </section>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
            <h3 className="text-2xl font-bold mb-4 underline">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-deco text-white rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Back to projects */}
        <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
          <Link
            href="/"
            className="text-deco hover:underline"
          >
            ← Back to projects
          </Link>
        </section>
      </motion.div>
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const projects = await client.fetch(PROJECTS_QUERY);

  const paths = locales
    ? locales.flatMap((locale) =>
        projects.map((project: any) => ({
          params: { slug: project.slug },
          locale,
        }))
      )
    : projects.map((project: any) => ({
        params: { slug: project.slug },
      }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const project = await client.fetch(PROJECT_QUERY, { slug });

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      ...(locale ? await serverSideTranslations(locale) : {}),
    },
    revalidate: 21600, // Revalidate every 6 hours
  };
};
