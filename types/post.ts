export type SanityPost = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'post';
  _updatedAt: string;
  author: {
    _ref: string;
    _type: 'reference';
  };
  body: Array<{
    _key: string;
    value: any[]; // Array of block content for each language
  }>;
  categories: Array<{
    _ref: string;
    _type: 'reference';
    _key: string;
  }>;
  mainImage: {
    _type: 'image';
    alt: string;
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  publishedAt: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  title: Array<{
    _key: string;
    value: string;
  }>;
};
