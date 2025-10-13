import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function CartScreen() {
  const { addedProduct } = useLocalSearchParams<{ addedProduct?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Shopping Cart</Text>
      
      {addedProduct ? (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>
            ✅ Product #{addedProduct} added to cart!
          </Text>
        </View>
      ) : null}

      <Text style={styles.emptyText}>Your cart is currently empty.</Text>

      <Pressable 
        style={styles.button}
        onPress={() => router.push("/(shop)")}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  successBanner: {
    backgroundColor: "#d1fae5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successText: {
    color: "#065f46",
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});