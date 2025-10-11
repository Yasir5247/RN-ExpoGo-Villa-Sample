import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FlashMessage from 'react-native-flash-message';
import { APIProvider } from '@/api/common/api-provider';
import { AuthProvider } from "./auth/auth-provider";
import { ThemeProvider } from "./theme-provider";

// Re-export theme provider and hook for easier imports
export { ThemeProvider, useTheme } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AuthProvider>
        <ThemeProvider>
          <APIProvider>
            <BottomSheetModalProvider>
              {children}
              <FlashMessage position="top" />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});