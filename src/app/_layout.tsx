import '../../global.css';

import { Stack } from 'expo-router';

export default function RootLayout() {
  
  return (
    <Stack screenOptions={{
      headerShown: true,           // show the header by default
      headerTitleAlign: "center",  // center the title
    }}>
      <Stack.Screen name="index" options={{ title: "Home"}} />
    </Stack>
  );
}


