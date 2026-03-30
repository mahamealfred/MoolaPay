import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type ThemeModeContextValue = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeModeContext = createContext<ThemeModeContextValue | undefined>(undefined);

type ThemeModeProviderProps = {
  children: ReactNode;
};

export function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const value = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode: () => setIsDarkMode((prev) => !prev),
    }),
    [isDarkMode],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return context;
}
