import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import type { DesktopNavProps } from "../../../types/navbar";

export const DesktopNav = ({ menu, locale, localizeUrl, resumeUrl, resumeTitle }: DesktopNavProps) => {
  return (
    <nav className="hidden lg:flex w-full justify-between">
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
                  inline-flex items-center justify-center 
                  rounded-md px-4 text-sm font-medium 
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
