import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { resources } from './resources';
import { getLanguage } from './utils';
export * from './utils';

// Initialize with default language, then load saved language
i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0].languageCode || 'en', // Start with device language
  fallbackLng: 'en',
  compatibilityJSON: 'v4', // By default React Native projects does not support Intl

  // allows integrating dynamic values into translations.
  interpolation: {
    escapeValue: false, // escape passed in values to avoid XSS injections
  },
});

// Load saved language synchronously after initialization
const savedLanguage = getLanguage();
if (savedLanguage) {
  i18n.changeLanguage(savedLanguage);
}

// Is it a RTL language?
export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
