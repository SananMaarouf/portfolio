import { Settings, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { ThemeSwatch } from "./theme-picker";
import { THEMES, THEME_LABELS, isTheme } from "@/lib/theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Locale = "en" | "nb";

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
  const { theme, setTheme } = useTheme();
  const t =
    currentLocale === "nb"
      ? { language: "Språk", theme: "Tema", settings: "Innstillinger" }
      : { language: "Language", theme: "Theme", settings: "Settings" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t.settings}
          data-chrome="start-button"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          {t.language}
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
          {t.theme}
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme ?? ""}
          onValueChange={(value) => {
            if (isTheme(value)) setTheme(value);
          }}
        >
          {THEMES.map((id) => (
            <DropdownMenuRadioItem
              key={id}
              value={id}
              indicator={false}
              className="cursor-pointer gap-2 pl-2"
            >
              <ThemeSwatch theme={id} />
              <span>{THEME_LABELS[id][currentLocale]}</span>
              {theme === id && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
