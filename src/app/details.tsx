import { View, Text, StyleSheet } from "react-native";

export default function DetailsScreen(){
  return (
    <View style={styles.container}>
      <Text>Im details screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    gap: 12, 
    alignItems: "center", 
    justifyContent: "center" 
  }
});