import React from 'react';

import './_hydration.ts';

import { AuthStore } from './auth-store';
import { UIStore } from './ui-store';

// Centralized stores object
export const stores = {
  auth: new AuthStore(),
  ui: new UIStore(),
};

type ContextStores = typeof stores;

const storeContext = React.createContext<ContextStores>(stores);

export const withStores = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P): React.ReactElement => {
    return React.createElement(
      storeContext.Provider,
      { value: stores },
      React.createElement(Component, props)
    );
  };
  return WrappedComponent;
};

export const useStores = (): ContextStores => React.useContext(storeContext);

export const hydrateStores = async (): Promise<void> => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const store = stores[key as keyof ContextStores];
      
      // Check if store has hydrate method (mobx-persist-store adds this automatically)
      if ('hydrate' in store && typeof store.hydrate === 'function') {
        await store.hydrate();
      }
    }
  }
};

// Export types
export type { TokenType, AuthStatus } from './auth-store';
export type { ColorSchemeType } from './ui-store';