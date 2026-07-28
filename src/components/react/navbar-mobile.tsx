import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcherMobile } from "./theme-switcher";
import type { MobileNavProps } from "../../../types/navbar";
import { LanguageSwitcherMobile } from "./language-switcher";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export const MobileNav = ({ menu, locale, localizeUrl, linkedinUrl }: MobileNavProps) => {
  return (
    <nav className="flex-row content-center w-full lg:hidden">
      <header className="flex justify-end">        
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
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </Button>
              </section>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </nav>
  );
};
