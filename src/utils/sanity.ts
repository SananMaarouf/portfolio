import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Project } from "../../types/project";
import type { Technology } from "../../types/technologies";
import type { Landing } from "../../types/landing";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getLanding(lang: string = 'en'): Promise<Landing> {
  return await sanityClient.fetch(
    groq`*[_type == "Landing"][0]{
      title,
      name,
      image,
      "job": job[_key == $lang][0].value,
      "location": location[_key == $lang][0].value
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
      "description": description[_key == $lang][0].value,
      "shortDescription": description[_key == $lang][0].value,
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

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset & { alt?: string };
  body: PortableTextBlock[];
}


