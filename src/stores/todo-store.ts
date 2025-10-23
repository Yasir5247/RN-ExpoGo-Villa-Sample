import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * TodoStore - MobX Example with Persistence
 * 
 * This demonstrates how to create a MobX store following the same pattern
 * as AuthStore, UILanguageStore, and UIThemeStore.
 * 
 * Key features:
 * - makeAutoObservable() makes all properties and methods reactive
 * - makePersistable() automatically persists to AsyncStorage
 * - Computed values (get filteredTodos, get activeCount) are auto-memoized
 * - Observable properties (todos, filter) trigger re-renders when changed
 * 
 * Usage:
 * const { todo } = useStores();
 * export const TodoList = observer(() => {
 *   const { todo } = useStores();
 *   return (
 *     <>
 *       {todo.filteredTodos.map(t => <Text key={t.id}>{t.title}</Text>)}
 *       <Text>Active: {todo.activeCount}</Text>
 *     </>
 *   );
 * });
 */

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export class TodoStore {
  // Observable properties
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    makeAutoObservable(this);
    
    // Auto-persist observable properties to AsyncStorage
    makePersistable(this, {
      name: 'TodoStore',
      properties: ['todos', 'filter'],
      storage: AsyncStorage,
    });
  }

  // ===== ACTIONS (methods that modify state) =====

  addTodo(title: string) {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
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

  updateTodo(id: string, title: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = title;
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter = filter;
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  // ===== COMPUTED VALUES (auto-memoized by MobX) =====

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

  // Hydration (makePersistable handles this, but included for interface compatibility)
  async hydrate(): Promise<void> {
    // makePersistable handles hydration automatically
  }
}
