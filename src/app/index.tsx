import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function ScreenOne(){
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>

      {/* Declarative navigation */}
      <Link href="/details" style={{ color: "#007AFF", marginTop: 20 }}>
        Go to Details
      </Link>

      {/* With params */}
      <Link href={{ pathname: "/details", params: { id: "42" } }}>
        Go to Details (id = 42)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    gap: 12, 
    alignItems: "center", 
    justifyContent: "center" 
  }
});