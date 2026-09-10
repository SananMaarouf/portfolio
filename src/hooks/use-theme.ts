import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, setTheme, subscribe } from "@/lib/theme-store";

/** `theme` is null until hydration — render no active state in that case. */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { theme, setTheme };
}
