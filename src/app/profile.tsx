import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen(){
  return (
    <View style={styles.container}>
      <Text>Im Profile Screen</Text>
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