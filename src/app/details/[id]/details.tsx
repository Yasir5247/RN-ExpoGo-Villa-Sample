import { View, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function DetailsScreen(){

  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24 }}>Details Screen</Text>
      <Text>ID: {id ?? "No ID provided"}</Text>

      <Text
        style={{ color: "#007AFF", marginTop: 20 }}
        onPress={() => router.back()}
      >
        Go Back
      </Text>
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