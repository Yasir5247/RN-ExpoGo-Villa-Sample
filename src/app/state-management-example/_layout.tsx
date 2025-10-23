import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { TodoProvider } from './context/todo-context';

/**
 * STATE MANAGEMENT EXAMPLES - Layout
 * 
 * This layout demonstrates two different approaches to state management in React Native:
 * 
 * 1. MobX Approach (stores/todo-store.ts)
 *    - Use makeAutoObservable() to create reactive stores
 *    - Wrap components with observer() to track dependencies
 *    - Use StoresProvider to distribute stores via context
 *    - Computed values are automatically memoized
 *    - Better performance for complex apps
 * 
 * 2. React Context Approach (context/todo-context.tsx)
 *    - Use useReducer for centralized state management
 *    - Use createContext to distribute state and actions
 *    - Memoize derived values with useMemo()
 *    - Use useCallback for stable action references
 *    - Simpler but requires more manual optimization
 * 
 * ARCHITECTURE COMPARISON:
 * 
 * MobX:
 *   Store → makeAutoObservable → Context → observer(Component)
 *   - Automatically tracks which components need re-renders
 *   - Fine-grained reactivity (only affected components re-render)
 *   - Less boilerplate
 * 
 * React Context:
 *   useReducer → Context → Component
 *   - All consumers re-render when context changes
 *   - Need useMemo/useCallback for optimization
 *   - More control over render behavior
 * 
 * WHEN TO USE EACH:
 * 
 * Use MobX for:
 * - Large-scale apps with complex state
 * - Frequent state updates (high re-render performance needed)
 * - Teams familiar with OOP patterns
 * - When you want automatic optimization
 * 
 * Use React Context for:
 * - Simple to medium-sized apps
 * - Minimal external dependencies
 * - Clear data flow (fewer magical optimizations)
 * - When learning React state management basics
 */

/**
 * For this example, we're using React Context.
 * If you want to use MobX, follow these steps instead:
 * 
 * 1. Create a stores/index.ts that exports TodoStore
 * 2. Wrap this layout with StoresProvider
 * 3. Use observer() on screens that consume the store
 * 4. Access state with useStores().todoStore
 * 
 * See src/stores for the existing MobX implementation pattern
 */

export default function StateManagementLayout() {
  return (
    <TodoProvider>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Todo App - State Management',
            headerSubtitle: 'React Context Example',
          }}
        />
      </Stack>
    </TodoProvider>
  );
}
