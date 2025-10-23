import '../../global.css';

import { Stack, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { hydrateStores } from '@/stores';
import { Providers } from './providers';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Hydrate stores from AsyncStorage (persistence)
        await hydrateStores();
        setIsReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setIsReady(true);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </Providers>
  );
}


