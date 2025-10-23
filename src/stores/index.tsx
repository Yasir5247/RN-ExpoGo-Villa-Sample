import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ============================================================
 * STATE MANAGEMENT DEMO - MobX vs React Context
 * ============================================================
 * 
 * This file demonstrates two approaches:
 * 1. MobX with makePersistable (recommended for large apps)
 * 2. React Context + useReducer (built-in React API)
 * 
 * To use MobX: wrap components with observer() and use useStores()
 * To use Context: use useTodoContext() directly
 */

// ============================================================
// PART 1: MobX STORE WITH PERSISTENCE
// ============================================================

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * MobX Store Example with Persistence
 * 
 * Key features:
 * - makeAutoObservable() for reactivity
 * - makePersistable() for automatic AsyncStorage persistence
 * - Computed values (filteredTodos, counts) automatically cached
 * - Actions (addTodo, toggleTodo, etc.)
 * 
 * Usage:
 * const { todoStore } = useStores();
 * 
 * Wrap component with observer():
 * export const MyComponent = observer(() => {
 *   const { todoStore } = useStores();
 *   return <Text>{todoStore.activeCount}</Text>;
 * });
 */
export class TodoStore {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    makeAutoObservable(this);
    
    // Auto-persist to AsyncStorage with makePersistable
    makePersistable(this, {
      name: 'TodoStore',
      properties: ['todos', 'filter'],
      storage: AsyncStorage,
    });
  }

  // ========== ACTIONS ==========
  
  addTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(newTodo);
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // ========== COMPUTED VALUES (auto-memoized by MobX) ==========
  
  get filteredTodos(): Todo[] {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }

  get activeCount(): number {
    return this.totalCount - this.completedCount;
  }

  async hydrate() {
    // makePersistable handles this automatically
  }
}

// Create singleton store instance
export const todoStore = new TodoStore();

// MobX Context
const MobXContext = createContext<{ todoStore: TodoStore } | null>(null);

export function MobXProvider({ children }: { children: ReactNode }) {
  return (
    <MobXContext.Provider value={{ todoStore }}>
      {children}
    </MobXContext.Provider>
  );
}

export function useStores() {
  const context = useContext(MobXContext);
  if (!context) {
    throw new Error('useStores must be used within MobXProvider');
  }
  return context;
}

// ============================================================
// PART 2: REACT CONTEXT + REDUCER WITH PERSISTENCE
// ============================================================

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'HYDRATE'; payload: Todo[] };

export interface TodoContextType {
  state: TodoState;
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
  filteredTodos: Todo[];
  completedCount: number;
  totalCount: number;
  activeCount: number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialState: TodoState = {
  todos: [],
  filter: 'all',
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    case 'HYDRATE':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
}

/**
 * React Context Provider
 * 
 * Handles persistence manually with:
 * - useEffect to persist todos to AsyncStorage
 * - useEffect to hydrate todos from AsyncStorage
 * - useMemo for derived values
 * - useCallback for stable action references
 */
export function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Memoized derived values
  const filteredTodos = React.useMemo(() => {
    if (state.filter === 'active') {
      return state.todos.filter(todo => !todo.completed);
    }
    if (state.filter === 'completed') {
      return state.todos.filter(todo => todo.completed);
    }
    return state.todos;
  }, [state.todos, state.filter]);

  const completedCount = React.useMemo(
    () => state.todos.filter(todo => todo.completed).length,
    [state.todos]
  );

  const totalCount = state.todos.length;
  const activeCount = totalCount - completedCount;

  // Action creators
  const addTodo = useCallback((title: string) => {
    dispatch({ type: 'ADD_TODO', payload: title });
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const setFilter = useCallback((filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  // Persist to AsyncStorage (manual approach)
  useEffect(() => {
    const persistTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(state.todos));
      } catch (error) {
        console.error('Failed to persist todos:', error);
      }
    };
    persistTodos();
  }, [state.todos]);

  // Hydrate from AsyncStorage
  useEffect(() => {
    const hydrateTodos = async () => {
      try {
        const stored = await AsyncStorage.getItem('todos');
        if (stored) {
          const todos = JSON.parse(stored);
          dispatch({ type: 'HYDRATE', payload: todos });
        }
      } catch (error) {
        console.error('Failed to hydrate todos:', error);
      }
    };
    hydrateTodos();
  }, []);

  const value: TodoContextType = {
    state,
    addTodo,
    removeTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    filteredTodos,
    completedCount,
    totalCount,
    activeCount,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext(): TodoContextType {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}