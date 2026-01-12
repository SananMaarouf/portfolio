import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import type { DesktopNavProps } from "../../../types/navbar";

export const DesktopNav = ({ logo, menu, locale, homeUrl, localizeUrl, resumeUrl, resumeTitle }: DesktopNavProps) => {
  return (
    <nav className="hidden lg:flex w-full justify-between">
      {/* Center section: Logo and navigation menu */}
      {/* Logo link */}
      <a href={homeUrl} className="flex items-center gap-2 group">
        {logo.image && (
          <img
            src={logo.image}
            alt={logo.alt || logo.title}
            className="h-10 w-auto rounded-full transition-transform duration-300"
          />
        )}
        <span className="text-primary text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">{logo.title}</span>
      </a>
      {/* Right section: Theme switcher and action button */}
      <section className="flex gap-2 items-center ml-auto">
        {/* Desktop navigation menu items */}
        <ul className="flex items-center gap-1">
          {menu.map((item) => {
            const href = localizeUrl(item.url);
            return (
              <li key={item.title}>
                <a
                  href={href}
                  className="
                  hover:bg-primary hover:text-primary-foreground 
                  inline-flex h-10 items-center justify-center 
                  rounded-md px-4 py-2 text-sm font-medium 
                  transition-colors duration-300"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <LanguageSwitcher currentLocale={locale} />
        <ThemeSwitcher />
        <Button asChild size="sm">
          <a href={resumeUrl} download>{resumeTitle}</a>
        </Button>
      </section>
    </nav>
  );
};
