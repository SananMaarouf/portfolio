import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Common GROQ queries
export const QUERIES = {
  // Get all projects
  PROJECTS: `*[_type == "project" && defined(slug.current)] | order(date desc) {
    _id,
    title,
    slug,
    shortDescription,
    date,
    heroImage,
    technologies,
    projectType,
    featured
  }`,

  // Get featured projects
  FEATURED_PROJECTS: `*[_type == "project" && featured == true && defined(slug.current)] | order(date desc) {
    _id,
    title,
    slug,
    shortDescription,
    date,
    heroImage,
    technologies,
    projectType
  }`,

  // Get single project by slug
  PROJECT_BY_SLUG: `*[_type == "project" && slug.current == $slug][0]`,

  // Get project slugs for static generation
  PROJECT_SLUGS: `*[_type == "project" && defined(slug.current)]{
    "slug": slug.current
  }`,
};
