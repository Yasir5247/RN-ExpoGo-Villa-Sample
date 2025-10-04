import '../../global.css';

import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
import { StyleSheet } from 'react-native';
import { useState, createContext, useContext } from 'react';
import { AuthProvider } from '@/lib/auth';


export default function RootLayout() {
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
const ThemeContext = createContext({ dark: false });

// Simple API context for Expo Go compatibility  
const APIContext = createContext({});

function useThemeConfig() {
  return useContext(ThemeContext);
}

function APIProvider({ children }: { children: React.ReactNode }) {
  return (
    <APIContext.Provider value={{}}>
      {children}
    </APIContext.Provider>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const themeContext = { dark: isDark };
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <ThemeContext.Provider value={themeContext}>
          <ThemeProvider value={navigationTheme}>
            <APIProvider>
              <BottomSheetModalProvider>
                {children}
                <FlashMessage position="top" />
              </BottomSheetModalProvider>
            </APIProvider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});