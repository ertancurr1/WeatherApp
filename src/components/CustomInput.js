import React from "react";
import { TextInput, StyleSheet, useColorScheme } from "react-native";

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  disabled,
  onSubmitEditing,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: isDark ? "#333333" : "#ffffff",
          color: isDark ? "#ffffff" : "#000000",
          borderColor: isDark ? "#555555" : "#dddddd",
        },
        disabled && styles.inputDisabled,
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={isDark ? "#999999" : "#888888"}
      editable={!disabled}
      returnKeyType="search"
      onSubmitEditing={onSubmitEditing}
      autoCapitalize="words"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 10,
  },
  inputDisabled: {
    opacity: 0.7,
  },
});

export default CustomInput;
