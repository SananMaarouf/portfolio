import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcherMobile } from "./theme-switcher";
import type { MobileNavProps } from "../../../types/navbar";
import { LanguageSwitcherMobile } from "./language-switcher";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export const MobileNav = ({ logo, menu, locale, homeUrl, localizeUrl, resumeUrl, resumeTitle }: MobileNavProps) => {
  return (
    <nav className="block lg:hidden">
      <header className="flex items-center justify-between">
        {/* Mobile logo */}
        <a href={homeUrl} className="flex items-center gap-2 group">
          {logo.image && (
            <img 
              src={logo.image} 
              alt={logo.alt || logo.title}
              className="h-8 w-auto rounded-full transition-transform duration-300"
            />
          )}
          <span className=" text-primary text-2xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">{logo.title}</span>
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
            <nav className="flex flex-col gap-2 p-4">
              {/* Mobile menu links */}
              <ul className="flex flex-col gap-4">
                {menu.map((item) => {
                  const href = localizeUrl(item.url);
                  return (
                    <li key={item.title}>
                      <a href={href} className="text-md font-semibold">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile action buttons */}
              <section className="flex flex-col gap-3">
                <LanguageSwitcherMobile currentLocale={locale} />
                <ThemeSwitcherMobile locale={locale} />
                <Button asChild>
                  <a href={resumeUrl} download>{resumeTitle}</a>
                </Button>
              </section>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </nav>
  );
};
