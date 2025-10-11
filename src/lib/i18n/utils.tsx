import type TranslateOptions from 'i18next';
import i18n from 'i18next';
import memoize from 'lodash.memoize';
import { useCallback, useEffect } from 'react';
import { I18nManager, NativeModules, Platform } from 'react-native';
// import RNRestart from 'react-native-restart';

import { stores } from '@/stores';
import type { Language, resources } from './resources';
import type { RecursiveKeyOf } from './types';

type DefaultLocale = typeof resources.en.translation;
export type TxKeyPath = RecursiveKeyOf<DefaultLocale>;

export const LOCAL = 'local';

export const getLanguage = () => stores.ui.language;

export const translate = memoize(
  (key: TxKeyPath, options = undefined) =>
    i18n.t(key, options) as unknown as string,
  (key: TxKeyPath, options: typeof TranslateOptions) =>
    options ? key + JSON.stringify(options) : key
);

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    if (__DEV__) NativeModules.DevSettings.reload();
    // else RNRestart.restart();
  } else if (Platform.OS === 'web') {
    window.location.reload();
  }
};

export const useSelectedLanguage = () => {
  useEffect(() => {
    // Load language from store and apply it
    if (stores.ui.language) {
      changeLanguage(stores.ui.language);
    }
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      stores.ui.setLanguage(lang);
      changeLanguage(lang);
    },
    []
  );

  return { language: stores.ui.language, setLanguage };
};
