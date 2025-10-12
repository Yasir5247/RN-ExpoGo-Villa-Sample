import React from 'react';

import './_hydration';

import { AuthStore, TokenType, AuthStatus } from './auth-store';
import { UILanguageStore } from './ui-language-store';
import { UIThemeStore } from './ui-theme-store';
import { IStore, PVoid } from './types';

// Re-export types
export type { TokenType, AuthStatus };

// Centralized stores object
class Stores {
  auth = new AuthStore()
  uiLanguage = new UILanguageStore()
  uiTheme = new UIThemeStore()
};

export const stores = new Stores();

const storeContext = React.createContext<Stores>(stores);
export const StoresProvider = ({ children }: any) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = (): Stores => React.useContext(storeContext);

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as any)[key] as IStore;

      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};