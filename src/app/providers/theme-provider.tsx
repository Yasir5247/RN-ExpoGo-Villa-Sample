import React, { createContext, useContext, useEffect } from 'react';
import { ThemeProvider as NavigationThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { loadSelectedTheme, useSelectedTheme } from '@/lib/hooks/use-selected-theme';

interface ThemeContextType {
  isDark: boolean;
  selectedTheme: 'light' | 'dark' | 'system';
  setSelectedTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  
  // Load theme on mount
  useEffect(() => {
    loadSelectedTheme();
  }, []);

  const isDark = colorScheme === 'dark';
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  const themeContextValue: ThemeContextType = {
    isDark,
    selectedTheme,
    setSelectedTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}