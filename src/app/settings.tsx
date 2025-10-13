import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen(){
  return (
    <View style={styles.container}>
      <Text>Im Settings Screen</Text>
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