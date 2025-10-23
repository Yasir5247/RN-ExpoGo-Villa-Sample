import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TodoProvider } from '@/stores';

/**
 * Root Providers
 * 
 * Wraps the app with necessary providers
 * For this demo: only TodoProvider for state management
 */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TodoProvider>
        {children}
      </TodoProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});