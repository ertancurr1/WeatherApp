import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../src/components/CustomInput";
import SearchButton from "../src/components/SearchButton";
import PreviousSearchItem from "../src/components/PreviousSearchItem";

export default function HomeScreen() {
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [previousSearches, setPreviousSearches] = useState([]);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    // Load previous searches when component mounts
    loadPreviousSearches();
  }, []);

  // Clear input when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setCityName("");
    }, [])
  );

  // Function to load previous searches from AsyncStorage
  const loadPreviousSearches = async () => {
    try {
      const savedSearches = await AsyncStorage.getItem("previousSearches");
      if (savedSearches) {
        setPreviousSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error("Error loading previous searches:", error);
    }
  };

  // Function to save a city search to AsyncStorage
  const saveCitySearch = async (city) => {
    try {
      // Save city to previous searches (avoiding duplicates and limiting to 5)
      const updatedSearches = [
        city,
        ...previousSearches.filter(
          (item) => item.toLowerCase() !== city.toLowerCase()
        ),
      ].slice(0, 5);

      await AsyncStorage.setItem(
        "previousSearches",
        JSON.stringify(updatedSearches)
      );
      setPreviousSearches(updatedSearches);
    } catch (error) {
      console.error("Error saving search:", error);
    }
  };

  // Handle the search button press
  const handleSearch = () => {
    if (cityName.trim()) {
      setIsLoading(true);

      // Save the search
      saveCitySearch(cityName.trim());

      // Navigate to weather screen with city name parameter
      router.push(`/weather/${encodeURIComponent(cityName.trim())}`);

      // Reset loading state and input field
      setIsLoading(false);
      setCityName("");
    }
  };

  // Handle previous search item press
  const handlePreviousSearch = (city) => {
    setCityName(city);
    router.push(`/weather/${encodeURIComponent(city)}`);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f0f0f0" },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#ffffff" : "#000000" }]}>
          Weather App
        </Text>
        <Text
          style={[styles.subtitle, { color: isDark ? "#cccccc" : "#555555" }]}
        >
          Search for a city to see the weather
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <CustomInput
          value={cityName}
          onChangeText={setCityName}
          placeholder="Enter city name"
          disabled={isLoading}
          onSubmitEditing={handleSearch}
        />
        <SearchButton
          onPress={handleSearch}
          disabled={isLoading || !cityName.trim()}
          isLoading={isLoading}
        />
      </View>

      {previousSearches.length > 0 && (
        <View style={styles.previousSearchesContainer}>
          <Text
            style={[
              styles.previousSearchesTitle,
              { color: isDark ? "#ffffff" : "#000000" },
            ]}
          >
            Previous Searches
          </Text>
          <View style={styles.previousSearchesList}>
            {previousSearches.map((city, index) => (
              <PreviousSearchItem
                key={index}
                city={city}
                onPress={() => handlePreviousSearch(city)}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  previousSearchesContainer: {
    width: "100%",
    marginTop: 20,
  },
  previousSearchesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  previousSearchesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
});
