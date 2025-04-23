import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#f0f0f0",
          },
          headerTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
          contentStyle: {
            backgroundColor: colorScheme === "dark" ? "#121212" : "#f0f0f0",
          },
        }}
      />
    </QueryClientProvider>
  );
}
