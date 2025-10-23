import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * MobX Store Example - TodoStore
 * 
 * This demonstrates how MobX manages state with:
 * - Observable properties (todos, filter)
 * - Actions (addTodo, removeTodo, toggleTodo, setFilter)
 * - Computed values (filteredTodos, completedCount, totalCount)
 * 
 * MobX automatically tracks dependencies and re-renders only affected components
 */
export class TodoStore {
  todos: Todo[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'TodoStore',
      properties: ['todos', 'filter'],
    });
  }

  // Actions - methods that modify state
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

  // Computed values - MobX automatically caches these
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

  async hydrate(): Promise<void> {
    // Store will be auto-hydrated by makePersistable
  }
}
