import React, { createContext, useContext, useReducer, useCallback, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; title: string } }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'HYDRATE'; payload: Todo[] };

interface TodoContextType {
  state: TodoState;
  addTodo: (title: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
  filteredTodos: Todo[];
  completedCount: number;
  totalCount: number;
  activeCount: number;
}

/**
 * React Context Example - TodoContext
 * 
 * This demonstrates how React Context manages state with:
 * - useReducer hook for centralized state management
 * - Context API for providing state and actions to components
 * - Derived values calculated in the hook
 * - Persistence via AsyncStorage
 * 
 * This approach requires less boilerplate than MobX but doesn't automatically
 * optimize re-renders. You need to use useMemo() in consuming components.
 */

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
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, title: action.payload.title }
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

  // Action creators with useCallback for stable references
  const addTodo = useCallback((title: string) => {
    dispatch({ type: 'ADD_TODO', payload: title });
  }, []);

  const removeTodo = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, title } });
  }, []);

  const setFilter = useCallback((filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }, []);

  // Persist state to AsyncStorage
  useEffect(() => {
    const persistState = async () => {
      try {
        await AsyncStorage.setItem('TodoContext', JSON.stringify(state.todos));
      } catch (error) {
        console.error('Failed to persist todos:', error);
      }
    };
    persistState();
  }, [state.todos]);

  // Hydrate from AsyncStorage on mount
  useEffect(() => {
    const hydrateState = async () => {
      try {
        const stored = await AsyncStorage.getItem('TodoContext');
        if (stored) {
          const todos = JSON.parse(stored);
          dispatch({ type: 'HYDRATE', payload: todos });
        }
      } catch (error) {
        console.error('Failed to hydrate todos:', error);
      }
    };
    hydrateState();
  }, []);

  const value: TodoContextType = {
    state,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
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
