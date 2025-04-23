import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (cityName.trim()) {
      // Will implement the navigation to weather screen later
      console.log("Searching for:", cityName);
      // Clear input
      setCityName("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={cityName}
          onChangeText={setCityName}
          placeholder="Enter city name"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSearch}
          disabled={!cityName.trim()}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: "#007bff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
