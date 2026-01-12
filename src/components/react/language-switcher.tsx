import { Languages, Check } from "lucide-react";
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
          <NavigationMenuContent className="">
            <div className="w-48 p-2 gap-2 flex flex-col">
              <button
                onClick={() => switchLanguage("en")}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-between ${
                  locale === "en" ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                <span>🇬🇧 English</span>
                {locale === "en" && <Check className="h-4 w-4" />}
              </button>
              <button
                onClick={() => switchLanguage("nb")}
                className={`w-full text-left px-3 py-2 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-between ${
                  locale === "nb" ? "bg-primary text-primary-foreground" : ""
                }`}
              >
                <span>🇳🇴 Norsk</span>
                {locale === "nb" && <Check className="h-4 w-4" />}
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
            className="w-full justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span>🇬🇧</span>
              <span>English</span>
            </div>
            {locale === "en" && <Check className="h-4 w-4" />}
          </Button>
          <Button
            variant={locale === "nb" ? "default" : "ghost"}
            onClick={() => switchLanguage("nb")}
            className="w-full justify-start gap-2"
          >
            <div className="flex items-center gap-2">
              <span>🇳🇴</span>
              <span>Norsk</span>
            </div>
            {locale === "nb" && <Check className="h-4 w-4" />}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
