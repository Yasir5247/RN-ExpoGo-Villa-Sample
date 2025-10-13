import '../../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home Screen",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerShown: true,
          //presentation: "modal", // open like a modal
        }}
      />
    </Stack>
  );
}


