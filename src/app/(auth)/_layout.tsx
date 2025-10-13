import { Stack } from "expo-router";

/**
 * NESTED AUTH STACK
 * This is a nested stack within the root stack.
 * It handles all authentication-related screens with their own navigation flow.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#6366f1" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Login Screen */}
      <Stack.Screen
        name="login"
        options={{
          title: "🔐 Login",
          headerBackTitle: "Back",
        }}
      />

      {/* Register Screen */}
      <Stack.Screen
        name="register"
        options={{
          title: "📝 Create Account",
        }}
      />

      {/* Forgot Password */}
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "Reset Password",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

