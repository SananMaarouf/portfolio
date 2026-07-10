import { sanityClient } from "sanity:client";
import type { Post } from "../../types/post";
import type { Project } from "../../types/project";
import type { Technology } from "../../types/technologies";
import type { Landing } from "../../types/landing";
import groq from "groq";

// Fetch posts localized by language, projecting a plain string title and excerpt
export async function getPosts(lang: string = 'en'): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc, _createdAt desc){
      _type,
      _createdAt,
      slug,
      // localized title
      "title": title[language == $lang][0].value,
      // first 160 chars of plain text body as excerpt
      "excerpt": pt::text(body[language == $lang][0].value)[0..160],
      // include body blocks if needed later
      "body": body[language == $lang][0].value,
      publishedAt,
      mainImage
    }`,
    { lang }
  );
}

export async function getLanding(lang: string = 'en'): Promise<Landing> {
  return await sanityClient.fetch(
    groq`*[_type == "Landing"][0]{
      title,
      name,
      image,
      "greeting": greeting[language == $lang][0].value,
      "job": job[language == $lang][0].value,
      "location": location[language == $lang][0].value
    }`,
    { lang }
  );
}

export async function getProjects(lang: string = 'en'): Promise<Project[]> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && defined(slug.current)] | order(date desc){
      _id,
      title,
      slug,
      "description": description[language == $lang][0].value,
      "shortDescription": description[language == $lang][0].value,
      date,
      version,
      technologies,
      projectType,
      githubUrl,
      liveUrl
    }`,
    { lang }
  );
}

export async function getExperienceEntries(lang: string = 'en'): Promise<Technology[]> {
  return await sanityClient.fetch(
    groq`*[_type == "technologies" ] | order(startDate desc){
      name  
    }`,
    { lang }
  );
}

export async function getProject(slug: string): Promise<Project> {
  return await sanityClient.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}




