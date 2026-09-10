import { Languages, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Locale = "en" | "nb";

interface LanguageSwitcherProps {
  currentLocale: Locale;
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
