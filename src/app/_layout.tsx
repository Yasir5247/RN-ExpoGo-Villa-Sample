import '../../global.css';

import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import { StyleSheet } from 'react-native';
import { useState, useEffect, createContext, useContext } from 'react';
import { AuthProvider } from '@/lib/auth';
import { APIProvider } from '@/api/common/api-provider';
import { useColorScheme } from 'nativewind';
import { loadSelectedTheme } from '@/lib';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await loadSelectedTheme();
      setIsReady(true);
    };
    prepare();
  }, []);

  if (!isReady) {
    return null;
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

// Simple theme context for Expo Go compatibility


function Providers({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <GestureHandlerRootView style={styles.container}>
        <AuthProvider>
          {/* <ThemeContext.Provider value={themeContext}> */}
          <ThemeProvider value={navigationTheme}>
            <APIProvider>
              <BottomSheetModalProvider>
                {children}
                <FlashMessage position="top" />
              </BottomSheetModalProvider>
            </APIProvider>
          </ThemeProvider>
          {/* </ThemeContext.Provider> */}
        </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});