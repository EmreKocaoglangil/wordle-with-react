import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  handleTheme: (theme: string) => void;
};

const initialState = {
  theme: "system",
  handleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    const root = window.document.documentElement; // html

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = isDarkMode ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme, isDarkMode]);

  const handleTheme = useCallback(
    (customTheme: string) => {
      localStorage.setItem(storageKey, customTheme);
      setTheme(customTheme);
    },
    [storageKey]
  );

  const value = useMemo(
    () => ({
      theme,
      handleTheme,
    }),
    [theme, handleTheme]
  );

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
