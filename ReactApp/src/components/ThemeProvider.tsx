import { useEffect } from "react";
import { useTheme } from "@/store/useTheme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}