import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ERROR_MESSAGES } from "../src/constants";

export default function ErrorScreen() {
  const router = useRouter();
  const { message } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const errorMessage = message
    ? decodeURIComponent(message)
    : ERROR_MESSAGES.GENERIC_ERROR;

  const handleBackToSearch = () => {
    router.replace("/");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f0f0f0" },
      ]}
    >
      <View style={styles.errorIconContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
      </View>

      <Text
        style={[styles.errorTitle, { color: isDark ? "#ffffff" : "#000000" }]}
      >
        Oops! Something went wrong
      </Text>

      <Text
        style={[styles.errorMessage, { color: isDark ? "#bbbbbb" : "#555555" }]}
      >
        {errorMessage}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? "#0080ff" : "#007bff" },
        ]}
        onPress={handleBackToSearch}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>Back to Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  errorIconContainer: {
    marginBottom: 24,
  },
  errorIcon: {
    fontSize: 64,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
