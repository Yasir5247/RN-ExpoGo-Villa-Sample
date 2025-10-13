import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TodoDetailsScreen() {
  const params = useLocalSearchParams();
  const { id, title, description } = params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Todo ID</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#888",
    marginTop: 16,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
});

