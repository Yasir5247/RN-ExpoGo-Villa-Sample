import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StoresProvider } from '@/stores';

/**
 * Root Providers
 * 
 * Wraps the app with necessary providers
 * - StoresProvider: MobX stores (including TodoStore)
 */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StoresProvider>
        {children}
      </StoresProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});