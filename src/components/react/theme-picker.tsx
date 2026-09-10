import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { THEMES, THEME_LABELS, type Theme } from "@/lib/theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * A live preview of a theme's palette. The nested `data-theme` scope makes
 * the stripes resolve that theme's tokens rather than the page's — the token
 * blocks in global.css use bare [data-theme="x"] selectors precisely so this
 * works on a non-root element.
 */
export function ThemeSwatch({ theme }: { theme: Theme }) {
  return (
    <span
      data-theme={theme}
      aria-hidden="true"
      // Literal radius: the nested scope overrides --radius too, and swatches
      // should read as one uniform control across themes.
      className="flex h-4 w-8 shrink-0 overflow-hidden rounded-[2px] border border-border"
    >
      <span className="flex-1 bg-background" />
      <span className="flex-1 bg-primary" />
      <span className="flex-1 bg-accent" />
    </span>
  );
}

export function ThemePickerMobile({ locale = "en" }: { locale?: string }) {
  const { theme, setTheme } = useTheme();
  const lang = locale === "nb" ? "nb" : "en";

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="theme" className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {lang === "nb" ? "Tema" : "Theme"}
        </AccordionTrigger>
        <AccordionContent
          className="mt-2 flex flex-col gap-2"
          role="radiogroup"
          aria-label={lang === "nb" ? "Tema" : "Theme"}
        >
          {THEMES.map((id) => {
            const active = theme === id;
            return (
              <Button
                key={id}
                role="radio"
                aria-checked={active}
                variant={active ? "default" : "ghost"}
                onClick={() => setTheme(id)}
                className="w-full justify-start gap-2"
              >
                <ThemeSwatch theme={id} />
                <span>{THEME_LABELS[id][lang]}</span>
                {active && <Check className="ml-auto h-4 w-4" />}
              </Button>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
