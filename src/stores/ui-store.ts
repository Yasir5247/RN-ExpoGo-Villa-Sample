import { makeAutoObservable } from 'mobx';
import { hydrateStore, makePersistable } from 'mobx-persist-store';
import type { Language } from '@/lib/i18n/resources';

export type ColorSchemeType = 'light' | 'dark' | 'system';

export class UIStore {
  selectedTheme: ColorSchemeType = 'light';
  language: Language = 'en';

  constructor() {
    makeAutoObservable(this);
    
    // Configure automatic persistence
    makePersistable(this, {
      name: 'UIStore',
      properties: ['selectedTheme', 'language'],
    });
  }

  setSelectedTheme(theme: ColorSchemeType) {
    this.selectedTheme = theme;
  }

  setLanguage(lang: Language) {
    this.language = lang;
  }

  hydrate = async (): Promise<void> => {
    await hydrateStore(this);
  };
}
