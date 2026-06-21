import { Settings, Check, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Locale = "en" | "nb";

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

function switchLanguage(newLocale: Locale) {
  const currentPath = window.location.pathname;
  let newPath: string;
  if (newLocale === "en") {
    newPath = currentPath.replace(/^\/nb/, "") || "/";
  } else {
    newPath = currentPath.startsWith("/nb")
      ? currentPath
      : "/nb" + (currentPath === "/" ? "" : currentPath);
  }
  window.location.href = newPath;
}

interface SettingsMenuProps {
  currentLocale: Locale;
}

export function SettingsMenu({ currentLocale }: SettingsMenuProps) {
  const { theme, toggle } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Language
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => switchLanguage("en")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>🇬🇧 English</span>
          {currentLocale === "en" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLanguage("nb")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span>🇳🇴 Norsk</span>
          {currentLocale === "nb" && <Check className="h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Theme
        </DropdownMenuLabel>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggle}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SettingsMenuMobile({ currentLocale }: SettingsMenuProps) {
  const { theme, toggle } = useTheme();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Settings className="h-4 w-4" />
        <span className="text-sm font-semibold">Settings</span>
      </div>

      <div className="flex flex-col gap-1 pl-1">
        <span className="text-xs text-muted-foreground px-1">Language</span>
        <Button
          variant={currentLocale === "en" ? "default" : "ghost"}
          onClick={() => switchLanguage("en")}
          className="w-full justify-between"
        >
          <span>🇬🇧 English</span>
          {currentLocale === "en" && <Check className="h-4 w-4" />}
        </Button>
        <Button
          variant={currentLocale === "nb" ? "default" : "ghost"}
          onClick={() => switchLanguage("nb")}
          className="w-full justify-between"
        >
          <span>🇳🇴 Norsk</span>
          {currentLocale === "nb" && <Check className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col gap-1 pl-1">
        <span className="text-xs text-muted-foreground px-1">Theme</span>
        <div className="flex items-center gap-2 px-3 py-1">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={toggle}
            aria-label="Toggle dark mode"
          />
          <Moon className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
