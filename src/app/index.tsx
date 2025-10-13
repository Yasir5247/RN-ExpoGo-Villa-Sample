import { View, Text, StyleSheet } from "react-native";

export default function ScreenOne(){
  return (
    <View style={styles.container}>
      <Text>Im screen One</Text>
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