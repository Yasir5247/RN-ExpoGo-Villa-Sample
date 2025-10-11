import { colorScheme, useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';

import { stores, ColorSchemeType } from '@/stores';

/**
 * this hooks should only be used while selecting the theme
 * This hooks will return the selected theme which is stored in MobX store
 * selectedTheme should be one of the following values 'light', 'dark' or 'system'
 * don't use this hooks if you want to use it to style your component based on the theme use useColorScheme from nativewind instead
 *
 */
export const useSelectedTheme = () => {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    // Load theme from store and apply it
    setColorScheme(stores.ui.selectedTheme);
  }, [setColorScheme]);

  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      setColorScheme(t);
      stores.ui.setSelectedTheme(t);
    },
    [setColorScheme]
  );

  return { 
    selectedTheme: stores.ui.selectedTheme, 
    setSelectedTheme 
  } as const;
};

// to be used in the root file to load the selected theme from store
export const loadSelectedTheme = () => {
  const theme = stores.ui.selectedTheme;
  if (theme !== undefined && theme !== null) {
    console.log('theme', theme);
    colorScheme.set(theme);
  }
};
