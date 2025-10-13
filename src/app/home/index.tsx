import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const todos = [
  { id: "1", title: "Buy groceries", description: "Get milk, eggs, and bread" },
  { id: "2", title: "Finish project", description: "Complete the React Native app" },
  { id: "3", title: "Gym workout", description: "Leg day - squats and deadlifts" },
  { id: "4", title: "Read book", description: "Continue reading 'Atomic Habits'" },
  { id: "5", title: "Call mom", description: "Catch up on the weekend plans" },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleTodoPress = (todo: typeof todos[0]) => {
    router.push({
      pathname: "/home/details",
      params: { id: todo.id, title: todo.title, description: todo.description },
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => handleTodoPress(item)}
          >
            <Text style={styles.todoTitle}>{item.title}</Text>
            <Text style={styles.todoDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  todoItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  todoDescription: {
    fontSize: 14,
    color: "#666",
  },
});

