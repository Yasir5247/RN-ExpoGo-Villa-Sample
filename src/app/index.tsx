import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to Villa App</Text>
      <Text style={styles.subtitle}>Nested Stack Layouts Demo</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Navigate to nested stacks:</Text>
        
        {/* Link to Shop Stack (nested navigation) */}
        <Link href="/(shop)" style={styles.link}>
          🛍️ Browse Shop (Nested Stack)
        </Link>
        
        {/* Link directly to product details */}
        <Link 
          href={{ pathname: "/(shop)/product/[id]", params: { id: "123" } }} 
          style={styles.link}
        >
          📦 View Product #123
        </Link>
        
        {/* Link to Auth Stack (nested navigation) */}
        <Link href="/(auth)/login" style={styles.link}>
          🔐 Login (Auth Stack)
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  section: {
    gap: 16,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  link: {
    color: "#007AFF",
    fontSize: 16,
    paddingVertical: 8,
  }
});