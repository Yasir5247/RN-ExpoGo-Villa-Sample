import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, router } from "expo-router";

const PRODUCTS = [
  { id: "1", name: "Vintage Chair", price: "$299" },
  { id: "2", name: "Modern Lamp", price: "$149" },
  { id: "3", name: "Oak Table", price: "$599" },
];

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Featured Products</Text>
      
      {PRODUCTS.map((product) => (
        <Pressable
          key={product.id}
          style={styles.productCard}
          onPress={() => router.push(`/(shop)/product/${product.id}`)}
        >
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        </Pressable>
      ))}
      
      <Link href="/(shop)/cart" style={styles.cartLink}>
        🛒 View Cart
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 16,
    color: "#10b981",
    fontWeight: "600",
  },
  cartLink: {
    color: "#007AFF",
    fontSize: 18,
    textAlign: "center",
    marginTop: 24,
  }
});