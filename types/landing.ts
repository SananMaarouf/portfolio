export type FeatureItem = {
  icon?: string;
  title?: string;
  description?: string;
};

export type Features = {
  title?: string;
  items?: FeatureItem[];
};

export type Landing = {
  title: string;
  name: string;
  image?: {
    asset?: any;
    alt?: string;
  };
  job?: string;
  location: string;
};
