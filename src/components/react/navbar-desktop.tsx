import { Button } from "@/components/ui/button";
import { SettingsMenu } from "./settings-menu";
import type { DesktopNavProps } from "../../../types/navbar";

export const DesktopNav = ({ menu, locale, localizeUrl, linkedinUrl }: DesktopNavProps) => {
  return (
    <nav className="hidden lg:flex w-full justify-between">
      <section className="flex gap-2 items-center ml-auto">
        <div className="flex items-center gap-1">
          {menu.map((item) => (
            <Button key={item.title} variant="ghost" size="sm" asChild>
              <a href={localizeUrl(item.url)}>{item.title}</a>
            </Button>
          ))}
        </div>
        <SettingsMenu currentLocale={locale} />
        <Button asChild size="sm">
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </Button>
      </section>
    </nav>
  );
};
