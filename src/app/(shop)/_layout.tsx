import { Stack } from "expo-router";

/**
 * NESTED SHOP STACK
 * This is a nested stack within the root stack.
 * It handles all shop-related screens with their own navigation flow.
 */
export default function ShopLayout() {
  return (
    <Stack 
      screenOptions={{ 
        headerStyle: { backgroundColor: "#10b981" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Products List */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "🛍️ Shop",
          headerBackTitle: "Back",
        }} 
      />
      
      {/* Dynamic Product Details */}
      <Stack.Screen 
        name="product/[id]" 
        options={{ 
          title: "Product Details",
          presentation: "card",
        }} 
      />
      
      {/* Shopping Cart */}
      <Stack.Screen 
        name="cart" 
        options={{ 
          title: "🛒 Cart",
          presentation: "modal", // Opens as modal on iOS
        }} 
      />
    </Stack>
  );
}