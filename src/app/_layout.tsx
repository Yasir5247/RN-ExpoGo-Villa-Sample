import '../../global.css';

import { Stack, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Providers } from './providers';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize app
    const init = async () => {
      try {
        // Add any initialization here
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


