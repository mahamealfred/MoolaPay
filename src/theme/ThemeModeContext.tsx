import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { lightColors, darkColors, ThemeColors } from './tokens';

type ThemeModeContextValue = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ThemeColors;
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
      colors: isDarkMode ? darkColors : lightColors,
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

export function useColors(): ThemeColors {
  const { colors } = useThemeMode();
  return colors;
}
