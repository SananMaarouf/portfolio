import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggle };
}

export function ThemeSwitcher() {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggle}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}

export function ThemeSwitcherMobile({ locale = "en" }: { locale?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="theme" className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {locale === "nb" ? "Tema" : "Theme"}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={toggle}
              aria-label="Toggle dark mode"
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {theme === "dark"
                ? locale === "nb" ? "Mørk tema" : "Dark mode"
                : locale === "nb" ? "Lyst tema" : "Light mode"}
            </span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
