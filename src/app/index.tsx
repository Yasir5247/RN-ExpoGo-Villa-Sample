import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTodoContext } from '@/stores';

/**
 * TODO APP - State Management Demo
 * 
 * This demonstrates React Context + useReducer for state management
 * See src/stores for the TodoStore implementation
 */

export default function TodoScreen() {
  const {
    filteredTodos,
    addTodo,
    removeTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
    completedCount,
    totalCount,
    activeCount,
    state,
  } = useTodoContext();

  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const renderTodoItem = ({ item }: any) => (
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
        style={styles.deleteBtn}
        onPress={() => removeTodo(item.id)}
      >
        <Text style={styles.deleteBtnText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📝 Todo App</Text>
        <Text style={styles.subtitle}>State Management Example</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatBox label="Total" value={totalCount} color="#333" />
        <StatBox label="Active" value={activeCount} color="#4CAF50" />
        <StatBox label="Done" value={completedCount} color="#2196F3" />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        <FilterBtn
          label="All"
          active={state.filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterBtn
          label="Active"
          active={state.filter === 'active'}
          onPress={() => setFilter('active')}
        />
        <FilterBtn
          label="Done"
          active={state.filter === 'completed'}
          onPress={() => setFilter('completed')}
        />
      </View>

      {/* Todo List */}
      <View style={styles.listContainer}>
        {filteredTodos.length > 0 ? (
          <FlatList
            data={filteredTodos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              {state.filter === 'completed'
                ? '✨ No completed todos'
                : state.filter === 'active'
                  ? '🎉 All done!'
                  : '🚀 Add your first todo'}
            </Text>
          </View>
        )}
      </View>

      {/* Clear Completed */}
      {completedCount > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearCompleted}>
          <Text style={styles.clearBtnText}>Clear Completed ({completedCount})</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

function StatBox({ label, value, color }: any) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

function FilterBtn({ label, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.filterBtn, active && styles.filterBtnActive]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.filterBtnText,
          active && styles.filterBtnTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
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
    borderColor: '#ddd',
    fontSize: 14,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  statsRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 8,
  },
  statBox: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  filterBtnActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterBtnText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  filterBtnTextActive: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },
  checkbox: {
    padding: 4,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  todoTextCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  deleteBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffebee',
  },
  deleteBtnText: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  clearBtn: {
    marginHorizontal: 16,
    marginBottom: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ffebee',
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 13,
    color: '#f44336',
    fontWeight: '600',
  },
});
