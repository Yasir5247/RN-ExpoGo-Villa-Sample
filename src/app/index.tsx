import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function ScreenOne(){
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Home Screen</Text>

      {/* Declarative navigation */}
      <Link href="/details/42/details" style={{ color: "#007AFF", marginTop: 20 }}>
        Go to Details
      </Link>

      {/* With params */}
      <Link href={{ pathname: "/details/[id]/details", params: { id: "42" } }}>
        Go to Details (id = 42)
      </Link>

      {/* Programmatic navigation */}
      <Button
        label="router.push to Details (id = 99)" 
        onPress={() => router.push("/details/99/details")} 
      />

      <Button
        variant="outline"
        label="router.push with params" 
        onPress={() => router.push({ 
          pathname: "/details/[id]/details", 
          params: { 
            id: "123" 
          } 
        })
      } 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center", 
    alignItems: "center" 
  }
});