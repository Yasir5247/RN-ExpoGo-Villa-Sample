import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTodoContext } from './context/todo-context';

/**
 * TODO APP - UI IMPLEMENTATION WITH REACT CONTEXT
 * 
 * This screen demonstrates how to:
 * 1. Consume context values and actions
 * 2. Update state by calling context actions
 * 3. Use memoized values to prevent unnecessary re-renders
 * 4. Build a functional todo list UI
 * 
 * Key Concepts:
 * - useTodoContext() hook provides access to state and actions
 * - todos are stored in state and persisted to AsyncStorage
 * - filteredTodos are pre-computed and memoized
 * - Each action (addTodo, toggleTodo, etc.) directly updates state
 */

export default function TodoAppScreen() {
  const {
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
  } = useTodoContext();

  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const renderTodoItem = ({ item }: { item: any }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleTodo(item.id)}
      >
        <View
          style={[
            styles.checkboxInner,
            item.completed && styles.checkboxChecked,
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[
          styles.todoText,
          item.completed && styles.todoTextCompleted,
        ]}
      >
        {item.title}
      </Text>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeTodo(item.id)}
      >
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTodo}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <StatCard title="Total" value={totalCount} />
        <StatCard title="Active" value={activeCount} color="#4CAF50" />
        <StatCard title="Completed" value={completedCount} color="#2196F3" />
      </View>

      {/* Filter Section */}
      <View style={styles.filterSection}>
        <FilterButton
          label="All"
          active={state.filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Active"
          active={state.filter === 'active'}
          onPress={() => setFilter('active')}
        />
        <FilterButton
          label="Completed"
          active={state.filter === 'completed'}
          onPress={() => setFilter('completed')}
        />
      </View>

      {/* Todo List */}
      <View style={styles.listSection}>
        {filteredTodos.length > 0 ? (
          <FlatList
            data={filteredTodos}
            renderItem={renderTodoItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {state.filter === 'completed'
                ? 'No completed todos yet'
                : state.filter === 'active'
                  ? 'No active todos. Great job!'
                  : 'No todos yet. Add one to get started!'}
            </Text>
          </View>
        )}
      </View>

      {/* Clear Completed Button */}
      {completedCount > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCompleted}
        >
          <Text style={styles.clearButtonText}>
            Clear Completed ({completedCount})
          </Text>
        </TouchableOpacity>
      )}

      {/* Code Reference Section */}
      <ScrollView style={styles.referenceSection}>
        <Text style={styles.referenceTitle}>💡 Understanding State Management</Text>
        
        <CodeBlock
          title="1. Using Context"
          code={`const {
  addTodo,
  removeTodo,
  filteredTodos,
  completedCount
} = useTodoContext();`}
        />

        <CodeBlock
          title="2. Adding a Todo"
          code={`addTodo('My new task');
// Automatically updates state and persists to AsyncStorage`}
        />

        <CodeBlock
          title="3. Comparing Approaches"
          code={`MobX: Store updates trigger re-renders
      automatically via observer()

Context: Manual memoization with useMemo()
         and useCallback() needed`}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Component showing a statistics card
 */
function StatCard({ title, value, color = '#000' }: { title: string; value: number; color?: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

/**
 * Component for filter buttons
 */
function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterButtonText,
          active && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * Component for displaying code examples
 */
function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <View style={styles.codeBlock}>
      <Text style={styles.codeBlockTitle}>{title}</Text>
      <Text style={styles.codeBlockContent}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  inputSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statCard: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  filterButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  checkbox: {
    padding: 4,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoTextCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#f44336',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  clearButton: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ffebee',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    color: '#f44336',
    fontWeight: '600',
  },
  referenceSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    maxHeight: 200,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  codeBlockTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 4,
  },
  codeBlockContent: {
    fontSize: 11,
    color: '#333',
    fontFamily: 'Courier New',
  },
});
