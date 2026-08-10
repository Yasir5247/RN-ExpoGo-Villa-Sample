import '../../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Flex (StyleSheet)",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "NativeWind",
          headerShown: true,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}


