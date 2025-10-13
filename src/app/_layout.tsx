import '../../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Home Screen */}
      <Stack.Screen
        name="index"
        options={{
          title: "Villa App",
          headerStyle: { backgroundColor: "#007AFF" },
          headerTintColor: "#fff",
        }}
      />
      
      {/* Shop Stack - nested navigation for e-commerce */}
      <Stack.Screen
        name="(shop)"
        options={{
          headerShown: false, // Hide root header, shop has its own
        }}
      />
      
      {/* Auth Stack - nested navigation for authentication */}
      <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false, // Hide root header, auth has its own
        }}
      />
    </Stack>
  );
}


