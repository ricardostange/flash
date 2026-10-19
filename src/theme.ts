import { useEffect, useState } from "react";

export type ThemePreference = "system" | "light" | "dark";
export const THEME_KEY = "memoria-theme";

function readPreference(): ThemePreference {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* The preference still works for this visit without storage. */
  }
  return "system";
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemePreference>(readPreference);
  const [themeWarning, setThemeWarning] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved =
        theme === "system" ? (media.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute("content", resolved === "dark" ? "#17181e" : "#f7f8fa");
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);

  function changeTheme(preference: ThemePreference) {
    setTheme(preference);
    try {
      localStorage.setItem(THEME_KEY, preference);
      setThemeWarning("");
    } catch {
      setThemeWarning(
        "O tema será aplicado apenas nesta visita: o armazenamento está indisponível.",
      );
    }
  }

  return { theme, changeTheme, themeWarning };
}
