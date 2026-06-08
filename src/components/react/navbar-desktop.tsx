import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";
import type { DesktopNavProps } from "../../../types/navbar";

export const DesktopNav = ({ menu, locale, localizeUrl, resumeUrl, resumeTitle }: DesktopNavProps) => {
  return (
    <nav className="hidden lg:flex w-full justify-between">
      <section className="flex gap-2 items-center ml-auto">
        {/* Desktop navigation menu items */}
        <div className="flex items-center gap-1">
          {menu.map((item) => (
            <Button key={item.title} variant="ghost" size="sm" asChild>
              <a href={localizeUrl(item.url)}>{item.title}</a>
            </Button>
          ))}
        </div>
        <LanguageSwitcher currentLocale={locale} />
        <ThemeSwitcher />
        <Button asChild size="sm">
          <a href={resumeUrl} download>{resumeTitle}</a>
        </Button>
      </section>
    </nav>
  );
};
