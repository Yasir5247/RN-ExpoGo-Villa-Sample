# State Management Examples - MobX vs React Context

This directory contains a practical todo app that demonstrates two popular state management approaches in React Native:

1. **MobX** - Reactive state management with automatic optimization
2. **React Context + useReducer** - Built-in React state management

## 📁 Directory Structure

```
state-management-example/
├── stores/
│   └── todo-store.ts          # MobX store example
├── context/
│   └── todo-context.tsx       # React Context example
├── _layout.tsx                 # Layout with provider setup
├── index.tsx                   # UI implementation (demo)
└── README.md                   # This file
```

## 🎯 Quick Start

### Using React Context (Current Implementation)

The example app currently uses React Context. To run it:

```bash
# Navigate to the app
cd src/app/state-management-example

# The TodoProvider is already set up in _layout.tsx
# Just use useTodoContext() in your components
```

### Switching to MobX

To use MobX instead, modify `_layout.tsx`:

```tsx
import { StoresProvider, hydrateStores } from '@/stores';
import { observer } from 'mobx-react-lite';

// 1. Wrap with StoresProvider
<StoresProvider>
  <Stack>
    {/* your routes */}
  </Stack>
</StoresProvider>

// 2. Wrap components with observer()
const MyComponent = observer(() => {
  const { todoStore } = useStores();
  // Now reactive!
});
```

## 📚 Understanding State Management

### 1. MobX Approach

**What is MobX?**
MobX is a reactive state management library that automatically tracks which components depend on which state.

**Key Concepts:**

- **Observable**: Properties that can be observed for changes
- **Actions**: Methods that modify state
- **Computed**: Derived values that are automatically memoized
- **observer**: Component wrapper that tracks dependencies

**Implementation Pattern:**

```tsx
// 1. Create a store with makeAutoObservable
export class TodoStore {
  todos: Todo[] = [];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  // Action
  addTodo(title: string) {
    this.todos.push(newTodo);
  }
  
  // Computed value
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }
}

// 2. Provide via Context
export const stores = new TodoStore();
export const StoresProvider = ({ children }) => (
  <storeContext.Provider value={stores}>
    {children}
  </storeContext.Provider>
);

// 3. Use with observer() wrapper
const TodoList = observer(() => {
  const { todoStore } = useStores();
  return <Text>{todoStore.activeCount}</Text>;
});
```

**Advantages:**
✅ Automatic re-render optimization (only affected components re-render)
✅ Less boilerplate in components
✅ Fine-grained reactivity
✅ Great for large, complex apps
✅ Better TypeScript support for complex state

**Disadvantages:**
❌ Additional library dependency
❌ Slight learning curve for decorators
❌ Magic optimization can be hard to debug

**When to Use:**
- Large-scale applications with complex state
- Frequent state updates requiring performance optimization
- Teams familiar with OOP/decorator patterns
- When you want automatic dependency tracking

---

### 2. React Context Approach

**What is React Context?**
React Context is a built-in way to pass data through the component tree without prop drilling. Combined with useReducer, it provides centralized state management.

**Key Concepts:**

- **createContext**: Creates a context object
- **useReducer**: Centralized state management with actions
- **useMemo**: Manually memoize derived values
- **useCallback**: Ensure stable action references

**Implementation Pattern:**

```tsx
// 1. Define state and actions
interface TodoState {
  todos: Todo[];
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: string };

// 2. Create reducer function
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, newTodo] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(...) };
    default:
      return state;
  }
}

// 3. Create context and provider
const TodoContext = createContext<TodoContextType>(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  const addTodo = useCallback((title: string) => {
    dispatch({ type: 'ADD_TODO', payload: title });
  }, []);
  
  return (
    <TodoContext.Provider value={{ state, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// 4. Use the context
function TodoList() {
  const { state, addTodo } = useTodoContext();
  return <Text>{state.todos.length}</Text>;
}
```

**Advantages:**
✅ No external dependencies (built-in React)
✅ Clear, explicit data flow
✅ Easier to understand for beginners
✅ Good for medium-sized apps
✅ Standard React patterns

**Disadvantages:**
❌ All consumers re-render when context changes (need optimization)
❌ More boilerplate with useMemo/useCallback
❌ Need to manually optimize re-renders
❌ Less ideal for frequent state updates across many components

**When to Use:**
- Simple to medium-sized applications
- Learning React state management
- When you prefer minimal dependencies
- Clear, explicit data flow is priority

---

## 🔄 Comparison Table

| Feature | MobX | React Context |
|---------|------|---------------|
| External Dependency | Yes | No |
| Learning Curve | Medium | Easy |
| Re-render Optimization | Automatic | Manual |
| Boilerplate | Low | Medium |
| Best For | Large Apps | Small-Medium Apps |
| Performance | Better for frequent updates | Sufficient for most cases |
| TypeScript | Excellent | Good |
| Debugging | Slightly harder | Easier |
| Bundle Size | ~30KB | 0KB (built-in) |

---

## 🏗️ Current Implementation (React Context)

The example app uses **React Context** for these reasons:

1. **Learning-friendly**: Easier to understand for beginners
2. **No dependencies**: Works with standard React API
3. **Clear patterns**: Explicit data flow via reducer
4. **Practical example**: Shows real-world todo app functionality

### File Overview

#### `context/todo-context.tsx`

Provides TodoProvider component and useTodoContext hook:

```tsx
// Usage
function TodoScreen() {
  const {
    filteredTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    setFilter,
    completedCount,
    activeCount,
  } = useTodoContext();
  
  // Your UI here
}
```

**Features:**
- useReducer for centralized state
- Memoized computed values (filteredTodos, counts)
- Stable action creators with useCallback
- AsyncStorage persistence
- TypeScript interfaces for all actions

#### `_layout.tsx`

Stack layout with TodoProvider setup:

```tsx
export default function StateManagementLayout() {
  return (
    <TodoProvider>
      <Stack>{/* Screens here */}</Stack>
    </TodoProvider>
  );
}
```

#### `index.tsx`

Full todo app UI demonstration:

```tsx
// Features:
- Add todos with keyboard submission
- Toggle completion status
- Delete todos
- Filter by status (All/Active/Completed)
- Statistics display (Total/Active/Completed)
- Clear completed todos
- Persistent storage
```

---

## 💻 Code Examples

### Adding a Todo (Context)

```tsx
function AddTodoInput() {
  const { addTodo } = useTodoContext();
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    addTodo(input);
    setInput('');
  };
  
  return (
    <TextInput
      value={input}
      onChangeText={setInput}
      onSubmitEditing={handleAdd}
    />
  );
}
```

### Adding a Todo (MobX)

```tsx
const AddTodoInput = observer(() => {
  const { todoStore } = useStores();
  const [input, setInput] = useState('');
  
  const handleAdd = () => {
    todoStore.addTodo(input);
    setInput('');
  };
  
  return (
    <TextInput
      value={input}
      onChangeText={setInput}
      onSubmitEditing={handleAdd}
    />
  );
});
```

### Displaying Computed Values (Context)

```tsx
function TodoStats() {
  const { completedCount, activeCount, totalCount } = useTodoContext();
  
  // These are pre-computed via useMemo in the provider
  return (
    <>
      <Text>Total: {totalCount}</Text>
      <Text>Active: {activeCount}</Text>
      <Text>Done: {completedCount}</Text>
    </>
  );
}
```

### Displaying Computed Values (MobX)

```tsx
const TodoStats = observer(() => {
  const { todoStore } = useStores();
  
  // These are automatically computed and memoized by MobX
  return (
    <>
      <Text>Total: {todoStore.totalCount}</Text>
      <Text>Active: {todoStore.activeCount}</Text>
      <Text>Done: {todoStore.completedCount}</Text>
    </>
  );
});
```

---

## 🎓 Learning Path

### Understanding React Context

1. Read `context/todo-context.tsx`
   - Learn how createContext works
   - Understand useReducer pattern
   - See memoization with useMemo/useCallback

2. Study `index.tsx`
   - How to use the hook (useTodoContext)
   - How to call actions
   - How to consume state

### Understanding MobX

1. Read `stores/todo-store.ts`
   - Learn about makeAutoObservable
   - Understand class-based stores
   - See computed values and actions

2. Study existing implementation
   - Check `src/stores/auth-store.ts`
   - Look at `src/app/providers/index.tsx`
   - See observer usage in `src/app/providers/auth/auth-provider.tsx`

---

## 🚀 Best Practices

### React Context Best Practices

```tsx
// ✅ DO: Split contexts by domain
const AuthContext = createContext(...);
const TodoContext = createContext(...);

// ❌ DON'T: Put everything in one context
const AppContext = createContext({ auth, todos, users, ... });

// ✅ DO: Memoize derived values
const activeCount = useMemo(
  () => state.todos.filter(t => !t.completed).length,
  [state.todos]
);

// ❌ DON'T: Calculate in render
const activeCount = state.todos.filter(t => !t.completed).length;

// ✅ DO: Use useCallback for actions
const addTodo = useCallback((title) => {
  dispatch({ type: 'ADD_TODO', payload: title });
}, []);

// ❌ DON'T: Define actions inline
<Button onPress={() => dispatch(...)} />
```

### MobX Best Practices

```tsx
// ✅ DO: Use makeAutoObservable for classes
export class TodoStore {
  constructor() {
    makeAutoObservable(this);
  }
}

// ✅ DO: Wrap components with observer
const TodoList = observer(() => {
  const { todoStore } = useStores();
  return <FlatList data={todoStore.filteredTodos} />;
});

// ✅ DO: Use computed for derived values
get completedCount() {
  return this.todos.filter(t => t.completed).length;
}

// ❌ DON'T: Forget observer() wrapper
const TodoList = () => {
  const { todoStore } = useStores();
  // Won't track reactive updates!
};
```

---

## 📖 Additional Resources

### React Context
- [React Docs: Context](https://react.dev/reference/react/useContext)
- [React Docs: useReducer](https://react.dev/reference/react/useReducer)
- [useCallback](https://react.dev/reference/react/useCallback)

### MobX
- [MobX Documentation](https://mobx.js.org/)
- [MobX React Integration](https://mobx.js.org/react-integration.html)
- [MobX Best Practices](https://mobx.js.org/best-practices.html)

### This Project
- See `src/stores/` for MobX examples in the main app
- See `src/app/providers/` for context patterns

---

## 🤔 Migration Guide

### Moving from Context to MobX

```tsx
// BEFORE (Context)
const { addTodo, filteredTodos } = useTodoContext();

// AFTER (MobX)
const { todoStore } = useStores();
// or
const todoStore = useLocalObservable(() => new TodoStore());

// Then wrap with observer()
export const TodoList = observer(() => {
  const { todoStore } = useStores();
  return <FlatList data={todoStore.filteredTodos} />;
});
```

### Moving from MobX to Context

```tsx
// BEFORE (MobX)
@observable todos = [];
@action addTodo(title) { ... }
@computed get filtered() { ... }

// AFTER (Context)
const [state, dispatch] = useReducer(todoReducer, initial);
const addTodo = useCallback((title) => {
  dispatch({ type: 'ADD_TODO', payload: title });
}, []);
const filtered = useMemo(() => filter(state.todos), [state.todos]);
```

---

## 💡 Tips

1. **Choose based on app scale**: Small app? Context. Large app? MobX.
2. **Both can coexist**: Use Context for simple states, MobX for complex ones
3. **Start simple**: Begin with Context, migrate to MobX if needed
4. **Persistence matters**: Both examples show AsyncStorage integration
5. **DevTools help**: MobX has better debugging tools

---

Created as part of state management education examples.
