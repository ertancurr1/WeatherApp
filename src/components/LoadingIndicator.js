import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

const LoadingIndicator = ({ message = "Loading..." }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={isDark ? "#0080ff" : "#007bff"} />
      <Text style={[styles.message, { color: isDark ? "#ffffff" : "#000000" }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LoadingIndicator;
