import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? "#121212" : "#f0f0f0",
          },
          headerTintColor: isDark ? "#ffffff" : "#000000",
          contentStyle: {
            backgroundColor: isDark ? "#121212" : "#f0f0f0",
          },
          headerShown: false, // Hide the header, we'll create our own
        }}
      />
    </QueryClientProvider>
  );
}
