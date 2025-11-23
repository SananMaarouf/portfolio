import type { PortableTextBlock } from '@portabletext/types';

type SanityImage = {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

// Gallery image with additional title and alt fields
type GalleryImage = SanityImage & {
  _key: string;
  title?: string;
  alt?: string;
};

// Internationalized string array (e.g., for multilingual content)
type InternationalizedString = Array<{
  _key: string;
  value: string;
}>;

// Internationalized block content array
type InternationalizedBlockContent = Array<{
  _key: string;
  value: PortableTextBlock[];
}>;

export type Project = {
  _createdAt: string;
  _id: string;
  _type: 'project';
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  description: string | Array<{
    _key: string;
    value: string;
  }>;
  shortDescription?: string; // Add localized shortDescription
  date: string;
  version?: string;
  heroImage?: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
  gallery?: Array<{
    _key: string;
    _type: 'image';
    title?: string;
    alt?: string;
    asset: {
      _ref: string;
      _type: 'reference';
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  }>;
  technologies?: string[];
  projectType: 'web' | 'mobile' | 'web / mobile';
  body?: Array<{
    _key: string;
    value: any[];
  }>;
  githubUrl?: string;
  liveUrl?: string;
};

export interface ProjectsCarouselProps {
  projects: Project[];
  t: {
    title: string;
    web: string;
    mobile: string;
    both: string;
    no_projects: string;
    see_all: string;
  };
  locale: string;
}