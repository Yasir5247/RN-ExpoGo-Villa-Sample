import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { observer } from 'mobx-react-lite';
import { APIProvider } from '@/api/common/api-provider';
import { StoresProvider, useStores } from '@/stores';
import { AuthProvider } from "./auth/auth-provider";

const ThemedApp = observer(({ children }: { children: React.ReactNode }) => {
  const { uiTheme } = useStores();
  
  return (
    <ThemeProvider value={uiTheme.navigationTheme}>
      <AuthProvider>
        <APIProvider>
          <BottomSheetModalProvider>
            {children}
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </APIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StoresProvider>
        <ThemedApp>
          {children}
        </ThemedApp>
      </StoresProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});