import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  description?: string;
  shortDescription?: string;
  date: string;
  version?: string;
  heroImage?: SanityImageSource;
  gallery?: Array<{
    _key: string;
    title?: string;
    alt?: string;
  } & SanityImageSource>;
  technologies?: string[];
  projectType: "web" | "mobile" | "web / mobile";
  body?: any[]; // PortableText content
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  Experience?: any[]; // Array of experiences (PortableText or strings)
}

export interface ProjectPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  shortDescription?: string;
  description?: string;
  date: string;
  heroImage?: SanityImageSource;
  technologies?: string[];
  projectType: "web" | "mobile" | "web / mobile";
  featured?: boolean;
}

export interface LocalizedText {
  _type: string;
  en?: string;
  nb?: string;
  [locale: string]: string | undefined; // allow dynamic locale lookup
}

export interface GalleryImage {
  _key: string;
  _type: string;
  alt?: string;
  asset: any;
  title?: string;
}
export interface ProjectWithGallery {
  gallery?: GalleryImage[];
  [key: string]: any;
}