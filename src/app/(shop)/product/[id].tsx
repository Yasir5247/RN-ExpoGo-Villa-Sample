import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

const PRODUCTS_DATA = {
  "1": { name: "Vintage Chair", price: "$299", description: "A beautiful vintage chair from the 1960s" },
  "2": { name: "Modern Lamp", price: "$149", description: "Sleek and modern design lamp" },
  "3": { name: "Oak Table", price: "$599", description: "Handcrafted oak dining table" },
  "123": { name: "Premium Sofa", price: "$1299", description: "Luxury 3-seater sofa" },
};

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = id ? PRODUCTS_DATA[id as keyof typeof PRODUCTS_DATA] : null;

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Product not found</Text>
        <Pressable onPress={() => router.back()} style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.id}>Product ID: {id}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Pressable 
        style={styles.button}
        onPress={() => {
          // Navigate to cart with this product
          router.push({ pathname: "/(shop)/cart", params: { addedProduct: id } });
        }}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>

      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back to Products</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  id: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    color: "#10b981",
    fontWeight: "600",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    padding: 16,
    alignItems: "center",
  },
  backButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
  error: {
    fontSize: 18,
    color: "#ef4444",
    textAlign: "center",
    marginBottom: 20,
  },
});

