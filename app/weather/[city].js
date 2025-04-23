import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useColorScheme,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useCurrentWeather,
  useForecast,
  processForecastData,
} from "../../src/hooks/useWeather";
import LoadingIndicator from "../../src/components/LoadingIndicator";
import {
  formatTemperature,
  formatDate,
  formatTime,
  getWeatherIconUrl,
} from "../../src/utils/formatters";
import { WEATHER_INFO } from "../../src/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function WeatherScreen() {
  const { city } = useLocalSearchParams();
  const decodedCity = decodeURIComponent(city);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Fetch current weather and forecast using React Query
  const {
    data: currentWeather,
    isLoading: isLoadingCurrent,
    error: currentError,
  } = useCurrentWeather(decodedCity);

  const {
    data: forecastData,
    isLoading: isLoadingForecast,
    error: forecastError,
  } = useForecast(decodedCity);

  // Process the forecast data
  const dailyForecast = processForecastData(forecastData);

  // Handle errors
  React.useEffect(() => {
    if (currentError || forecastError) {
      const errorMessage =
        currentError?.message ||
        forecastError?.message ||
        "An unexpected error occurred";
      router.push(`/error?message=${encodeURIComponent(errorMessage)}`);
    }
  }, [currentError, forecastError, router]);

  // Handle loading state
  if (isLoadingCurrent || isLoadingForecast) {
    return (
      <LoadingIndicator message={`Loading weather for ${decodedCity}...`} />
    );
  }

  // Get background color based on weather condition
  const getBackgroundColor = () => {
    const weatherMain = currentWeather?.weather?.[0]?.main;

    // Define colors for different weather conditions
    const colors = {
      Clear: isDark ? "#0d253f" : "#4da0ff",
      Clouds: isDark ? "#333333" : "#b3b3b3",
      Rain: isDark ? "#263238" : "#607d8b",
      Drizzle: isDark ? "#37474f" : "#78909c",
      Thunderstorm: isDark ? "#1c313a" : "#455a64",
      Snow: isDark ? "#0288d1" : "#b3e5fc",
      Mist: isDark ? "#455a64" : "#b0bec5",
      Fog: isDark ? "#455a64" : "#b0bec5",
      Haze: isDark ? "#455a64" : "#b0bec5",
    };

    return colors[weatherMain] || (isDark ? "#1a1a1a" : "#42a5f5");
  };

  // Handle the back button press
  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* City Name and Date */}
      <View style={styles.header}>
        <Text style={styles.cityName}>
          {currentWeather?.name}, {currentWeather?.sys?.country}
        </Text>
        <Text style={styles.date}>{formatDate(currentWeather?.dt)}</Text>
      </View>

      {/* Current Weather */}
      <View style={styles.currentWeatherContainer}>
        <View style={styles.currentWeatherMain}>
          {/* Weather Icon */}
          {currentWeather?.weather?.[0]?.icon && (
            <Image
              source={{
                uri: getWeatherIconUrl(currentWeather.weather[0].icon, 4),
              }}
              style={styles.weatherIcon}
            />
          )}

          {/* Temperature */}
          <Text style={styles.temperature}>
            {formatTemperature(currentWeather?.main?.temp)}
          </Text>

          {/* Weather Description */}
          <Text style={styles.weatherDescription}>
            {currentWeather?.weather?.[0]?.description}
          </Text>

          {/* Hi-Lo Temperatures */}
          <Text style={styles.hiLoTemp}>
            H: {formatTemperature(currentWeather?.main?.temp_max, false)} L:{" "}
            {formatTemperature(currentWeather?.main?.temp_min, false)}
          </Text>
        </View>

        {/* Weather Details */}
        <View style={styles.weatherDetails}>
          {WEATHER_INFO.map((info, index) => {
            let value;
            if (info.valueKey && info.key === "windSpeed") {
              value = currentWeather?.wind?.[info.valueKey];
            } else {
              value =
                currentWeather?.main?.[info.key] || currentWeather?.[info.key];
            }

            if (info.divideBy && value) {
              value = (value / info.divideBy).toFixed(1);
            }

            return (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailLabel}>{info.label}</Text>
                <Text style={styles.detailValue}>
                  {value !== undefined ? `${value} ${info.unit}` : "--"}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Sunrise and Sunset */}
      <View style={styles.sunTimesContainer}>
        <View style={styles.sunTimeItem}>
          <Text style={styles.sunTimeLabel}>Sunrise</Text>
          <Text style={styles.sunTimeValue}>
            {formatTime(currentWeather?.sys?.sunrise)}
          </Text>
        </View>
        <View style={styles.sunTimeItem}>
          <Text style={styles.sunTimeLabel}>Sunset</Text>
          <Text style={styles.sunTimeValue}>
            {formatTime(currentWeather?.sys?.sunset)}
          </Text>
        </View>
      </View>

      {/* Daily Forecast */}
      {dailyForecast.length > 0 && (
        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <View style={styles.forecastList}>
            {dailyForecast.map((item, index) => (
              <View key={index} style={styles.forecastItem}>
                <Text style={styles.forecastDay}>{item.day}</Text>
                {item.weather?.icon && (
                  <Image
                    source={{ uri: getWeatherIconUrl(item.weather.icon) }}
                    style={styles.forecastIcon}
                  />
                )}
                <View style={styles.forecastTemp}>
                  <Text style={styles.forecastTempHigh}>
                    {formatTemperature(item.temp_max, false)}
                  </Text>
                  <Text style={styles.forecastTempLow}>
                    {formatTemperature(item.temp_min, false)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 16 : 16,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#ffffff",
    marginTop: 4,
  },
  currentWeatherContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  currentWeatherMain: {
    alignItems: "center",
    marginBottom: 16,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#ffffff",
  },
  weatherDescription: {
    fontSize: 18,
    color: "#ffffff",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  hiLoTemp: {
    fontSize: 16,
    color: "#ffffff",
  },
  weatherDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  detailItem: {
    width: "48%",
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  sunTimesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sunTimeItem: {
    alignItems: "center",
  },
  sunTimeLabel: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  sunTimeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  forecastContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 16,
  },
  forecastTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  forecastList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastItem: {
    alignItems: "center",
    width: SCREEN_WIDTH / 6,
  },
  forecastDay: {
    fontSize: 14,
    color: "#ffffff",
    marginBottom: 4,
  },
  forecastIcon: {
    width: 40,
    height: 40,
    marginVertical: 4,
  },
  forecastTemp: {
    alignItems: "center",
  },
  forecastTempHigh: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  forecastTempLow: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
});
