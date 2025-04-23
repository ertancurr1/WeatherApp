import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ERROR_MESSAGES } from "../src/constants";

export default function ErrorScreen() {
  const router = useRouter();
  const { message } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Use the message from URL parameters, or fall back to a generic message
  const errorMessage = message
    ? decodeURIComponent(message)
    : ERROR_MESSAGES.GENERIC_ERROR;

  const handleBackToSearch = () => {
    router.replace("/");
  };

  return (
    <View
      style={[
        styles.outerContainer,
        { backgroundColor: isDark ? "#121212" : "#f0f0f0" },
      ]}
    >
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
          style={[
            styles.errorMessage,
            { color: isDark ? "#bbbbbb" : "#555555" },
          ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  webContainer: {
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
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
    marginBottom: 16,
    textAlign: "center",
  },
  errorMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 24,
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
