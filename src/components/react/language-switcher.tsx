import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type Locale = "en" | "nb";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<Locale>(currentLocale);

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

  const switchLanguage = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    let newPath: string;

    if (newLocale === "en") {
      // Switch to English: remove /nb prefix
      newPath = currentPath.replace(/^\/nb/, "") || "/";
    } else {
      // Switch to Norwegian: add /nb prefix
      if (currentPath.startsWith("/nb")) {
        newPath = currentPath;
      } else {
        newPath = "/nb" + (currentPath === "/" ? "" : currentPath);
      }
    }

    window.location.href = newPath;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Languages className="h-5 w-5" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-popover text-popover-foreground">
            <div className="w-48 p-2">
              <button
                onClick={() => switchLanguage("en")}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                  locale === "en" ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => switchLanguage("nb")}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
                  locale === "nb" ? "bg-accent text-accent-foreground" : ""
                }`}
              >
                🇳🇴 Norsk
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export function LanguageSwitcherMobile({ currentLocale }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<Locale>(currentLocale);

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

  const switchLanguage = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    let newPath: string;

    if (newLocale === "en") {
      // Switch to English: remove /nb prefix
      newPath = currentPath.replace(/^\/nb/, "") || "/";
    } else {
      // Switch to Norwegian: add /nb prefix
      if (currentPath.startsWith("/nb")) {
        newPath = currentPath;
      } else {
        newPath = "/nb" + (currentPath === "/" ? "" : currentPath);
      }
    }

    window.location.href = newPath;
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="language" className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          Language / Språk
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          <Button
            variant={locale === "en" ? "default" : "ghost"}
            onClick={() => switchLanguage("en")}
            className="w-full justify-start gap-2"
          >
            <span>🇬🇧</span>
            <span>English</span>
          </Button>
          <Button
            variant={locale === "nb" ? "default" : "ghost"}
            onClick={() => switchLanguage("nb")}
            className="w-full justify-start gap-2"
          >
            <span>🇳🇴</span>
            <span>Norsk</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
