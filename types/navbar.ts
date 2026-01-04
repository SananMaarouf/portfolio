// Type definition for individual menu items
// Supports nested items for dropdown menus
interface MenuItem {
  title: string;
  url: string;
}

// Type definition for navbar component props
// Allows customization of logo, menu items, and action buttons
interface NavbarProps {
  logo?: {
    title: string;
    image?: string;
    alt?: string;
  };
  menu?: MenuItem[];
  linkBtn?: {
    signup: {
      title: string;
      url: string;
    };
  };
  locale?: "en" | "nb";
}

type Locale = "en" | "nb";

interface DesktopNavProps {
  logo: NonNullable<NavbarProps["logo"]>;
  menu: NonNullable<NavbarProps["menu"]>;
  locale: Locale;
  homeUrl: string;
  localizeUrl: (url: string) => string;
  resumeUrl: string;
  resumeTitle: string;
}

interface MobileNavProps {
  logo: NonNullable<NavbarProps["logo"]>;
  menu: NonNullable<NavbarProps["menu"]>;
  locale: Locale;
  homeUrl: string;
  localizeUrl: (url: string) => string;
  resumeUrl: string;
  resumeTitle: string;
}

export type { MenuItem, NavbarProps, MobileNavProps, DesktopNavProps };