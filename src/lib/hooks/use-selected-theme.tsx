import { colorScheme, useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';

import { getItem, setItem } from '../storage';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark' | 'system';
/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in MMKV
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const { colorScheme: _color, setColorScheme } = useColorScheme();
  const [theme, setTheme] = useState<ColorSchemeType>('system');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getItem<ColorSchemeType>(SELECTED_THEME);
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const setSelectedTheme = React.useCallback(
    async (t: ColorSchemeType) => {
      setColorScheme(t);
      setTheme(t);
      await setItem(SELECTED_THEME, t);
    },
    [setColorScheme]
  );

  const selectedTheme = theme;
  return { selectedTheme, setSelectedTheme } as const;
};
// to be used in the root file to load the selected theme from AsyncStorage
export const loadSelectedTheme = async () => {
  const theme = await getItem<ColorSchemeType>(SELECTED_THEME);
  if (theme !== undefined && theme !== null) {
    console.log('theme', theme);
    colorScheme.set(theme);
  }
};
