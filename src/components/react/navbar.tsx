import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher, ThemeSwitcherMobile } from "./theme-switcher";
import { LanguageSwitcher, LanguageSwitcherMobile } from "./language-switcher";

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

// Main Navbar component with responsive design
// Displays different layouts for desktop (lg+) and mobile screens
const Navbar = ({logo = {title: "Acme Corp", image: "/logo.png", alt: "Logo"},
  // Default menu structure
  menu = [
    {
      title: "Projects",
      url: "/projects",
    },
    {
      title: "Posts",
      url: "/posts",
    },
  ],
  // Default call-to-action button
  linkBtn = {
    signup: { title: "Posts", url: "/posts" },
  },
  locale = "en",
}: NavbarProps) => {
  const homeUrl = locale === "nb" ? "/nb/" : "/";
  const localizeUrl = (url: string) => {
    if (locale === "nb" && url.startsWith("/")) {
      if (url === "/") return "/nb/"; // root
      return `/nb${url}`; // prefix for nb
    }
    return url;
  };
  const resumeUrl = locale === "nb" ? "/download/cv-no" : "/download/cv-en";
  const resumeTitle = locale === "nb" ? "CV" : "Resume";
  
  return (
    // Sticky navbar with backdrop blur effect
    <section className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b pt-4 pb-4">
      <div className="container">
        {/* Desktop Menu - Hidden on mobile, visible on large screens */}
        <nav className="hidden justify-center gap-3 lg:flex">
          {/* Center section: Logo and navigation menu */}
          <div className="flex items-center gap-8">
            {/* Logo link */}
            <a href={homeUrl} className="flex items-center gap-2 group">
              {logo.image && (
                <img 
                  src={logo.image} 
                  alt={logo.alt || logo.title}
                  className="h-10 w-auto hover:scale-110 transition-transform duration-300"
                />
              )}
            </a>
            {/* Desktop navigation menu items */}
            <div className="flex items-center gap-1">
              {menu.map((item) => {
                const href = localizeUrl(item.url);
                return (
                  <a
                    key={item.title}
                    href={href}
                    className="hover:bg-muted hover:text-accent-foreground inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  >
                    {item.title}
                  </a>
                );
              })}
            </div>
            {/* Right section: Theme switcher and action button */}
            <div className="flex gap-2 items-center ml-auto">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeSwitcher />
              <Button asChild size="sm">
                <a href={resumeUrl} download>{resumeTitle}</a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Visible only on small screens */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Mobile logo */}
            <a href={homeUrl} className="flex items-center gap-2">
              {logo.image && (
                <img 
                  src={logo.image} 
                  alt={logo.alt || logo.title}
                  className="h-8 w-auto hover:scale-110 transition-transform duration-300"
                />
              )}
            </a>
            {/* Mobile menu drawer/sheet */}
            <Sheet>
              {/* Hamburger menu button */}
              <SheetTrigger asChild>
                <Button size="icon-lg">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              {/* Slide-out menu content */}
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {/* Mobile menu links */}
                  <div className="flex flex-col gap-4">
                    {menu.map((item) => {
                      const href = localizeUrl(item.url);
                      return (
                        <a key={item.title} href={href} className="text-md font-semibold">
                          {item.title}
                        </a>
                      );
                    })}
                  </div>

                  {/* Mobile action buttons */}
                  <div className="flex flex-col gap-3">
                    <Button asChild>
                      <a href={resumeUrl} download>{resumeTitle}</a>
                    </Button>
                    <LanguageSwitcherMobile currentLocale={locale} />
                    <ThemeSwitcherMobile />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
