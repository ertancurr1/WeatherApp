import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  useColorScheme,
} from "react-native";

const PreviousSearchItem = ({ city, onPress }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isDark ? "#333333" : "#ffffff",
          borderColor: isDark ? "#555555" : "#dddddd",
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: isDark ? "#ffffff" : "#000000" }]}>
        {city}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default PreviousSearchItem;
