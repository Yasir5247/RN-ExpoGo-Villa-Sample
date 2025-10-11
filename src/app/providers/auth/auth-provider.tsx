import React, { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { stores, TokenType, AuthStatus } from '@/stores';

interface AuthState {
  token: TokenType | null;
  status: AuthStatus;
  isFirstTime: boolean;
  signIn: (data: TokenType) => void;
  signOut: () => Promise<void>;
  setIsFirstTime: (value: boolean) => void;
}

const AuthContext = createContext<AuthState | null>(null);

export const AuthProvider = observer(({ children }: { children: React.ReactNode }) => {
  const value: AuthState = {
    token: stores.auth.token,
    status: stores.auth.status,
    isFirstTime: stores.auth.isFirstTime,
    signIn: (data) => stores.auth.signIn(data),
    signOut: () => stores.auth.signOut(),
    setIsFirstTime: (value) => stores.auth.setIsFirstTime(value),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}