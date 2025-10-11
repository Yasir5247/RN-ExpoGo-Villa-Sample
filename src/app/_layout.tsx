import '../../global.css';

import { Stack, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { hydrateStores } from '@/stores';
import { Providers } from './providers';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Hydrate all stores from AsyncStorage
        await hydrateStores();
        setIsHydrated(true);
      } catch (error) {
        console.error('Failed to hydrate stores:', error);
        setIsHydrated(true); // Continue anyway
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isHydrated) {
      // Hide splash screen once the app is ready
      const hideSplash = async () => {
        await SplashScreen.hideAsync();
      };
      
      // Small delay to ensure smooth transition
      setTimeout(() => {
        hideSplash();
      }, 500);
    }
  }, [isHydrated]);

  if (!isHydrated) {
    return null; // or a loading screen
  }

  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}


