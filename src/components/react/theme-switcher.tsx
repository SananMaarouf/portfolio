import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setThemeState(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, toggle, setTheme };
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
  const { theme, setTheme } = useTheme();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="theme" className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {locale === "nb" ? "Tema" : "Theme"}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-2">
          <Button
            variant={theme === "light" ? "default" : "ghost"}
            onClick={() => setTheme("light")}
            className="w-full justify-start gap-2"
          >
            <Sun className="h-5 w-5" />
            <span>{locale === "nb" ? "Lyst tema" : "Light mode"}</span>
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "ghost"}
            onClick={() => setTheme("dark")}
            className="w-full justify-start gap-2"
          >
            <Moon className="h-5 w-5" />
            <span>{locale === "nb" ? "Mørk tema" : "Dark mode"}</span>
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
