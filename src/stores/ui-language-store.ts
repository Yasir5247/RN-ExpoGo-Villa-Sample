import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import { I18nManager } from 'react-native';
import type { Language } from '@/lib/i18n/resources';
import { syncLanguage } from '@/lib/i18n';
import { UILanguage, PVoid } from './types';

export class UILanguageStore {
  isSystemLanguage = false;
  language: Language = "ar";
  isLanguageChanging = false;

  setLanguage = async (v: Language | UILanguage): Promise<void> => {
    try {
      this.isLanguageChanging = true;
      
      if (v === "English" || v === "Dhivehi") {
        this.isSystemLanguage = v === "English";
        this.language = this.languageFromUIToInternal(v as UILanguage);
      } else {
        this.isSystemLanguage = v === "en";
        this.language = v as Language;
      }

      const shouldBeRTL = this.language === "ar";
      if (shouldBeRTL !== I18nManager.isRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
      }
      
      // Sync i18next
      syncLanguage(this.language);
    } finally {
      this.isLanguageChanging = false;
    }
  };

  get languageName(): UILanguage {
    return this.languageFromInternalToUI(this.language);
  }

  private languageFromInternalToUI = (v: Language): UILanguage => {
    return v === "en" ? "English" : "Dhivehi";
  };

  private languageFromUIToInternal = (v: UILanguage): Language => {
    return v === "English" ? "en" : "ar";
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "UILanguage",
      properties: [
        "isSystemLanguage",
        "language",
      ],
      debugMode: false,
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}

