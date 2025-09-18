import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getProjects(): Promise<Project[]> {
  return await sanityClient.fetch(
    groq`
    *[_type == "project" && defined(slug.current)] | order(date desc)`
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

export interface Project {
  _id: string;
  _createdAt: string;
  _rev: string;
  _type: "project";
  _updatedAt: string;
  title: string;
  slug: Slug;
  description: string | { _type: 'i18n.string'; en: string; nb: string };
  date: string;
  version?: string;
  heroImage?: ImageAsset & { alt?: string };
  technologies?: string[];
  projectType?: string;
  githubUrl?: string;
  liveUrl?: string;
  Experience?: any[];
  body?: {
    _type: 'i18n.text';
    en: string;
    nb: string;
  };
}
