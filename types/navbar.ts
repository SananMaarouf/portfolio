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
  menu: NonNullable<NavbarProps["menu"]>;
  locale: Locale;
  localizeUrl: (url: string) => string;
  linkedinUrl: string;
}

interface MobileNavProps {
  menu: NonNullable<NavbarProps["menu"]>;
  locale: Locale;
  localizeUrl: (url: string) => string;
  linkedinUrl: string;
}

export type { MenuItem, NavbarProps, MobileNavProps, DesktopNavProps };