import React, { createContext, useContext, useEffect, useState } from 'react';

import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<TokenType | null>(null);
  const [status, setStatus] = useState<'idle' | 'signOut' | 'signIn'>('idle');

  const signIn = async (tokenData: TokenType) => {
    try {
      await setToken(tokenData);
      setTokenState(tokenData);
      setStatus('signIn');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await removeToken();
      setTokenState(null);
      setStatus('signOut');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const hydrate = async () => {
    try {
      const userToken = await getToken();
      if (userToken !== null) {
        setTokenState(userToken);
        setStatus('signIn');
      } else {
        setTokenState(null);
        setStatus('signOut');
      }
    } catch (e) {
      console.error('Error hydrating auth:', e);
      setTokenState(null);
      setStatus('signOut');
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  const value: AuthState = {
    token,
    status,
    signIn,
    signOut,
    hydrate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Utility functions for direct access
export const signOut = async () => {
  await removeToken();
};

export const signIn = async (token: TokenType) => {
  await setToken(token);
};

export const hydrateAuth = async () => {
  return await getToken();
};
