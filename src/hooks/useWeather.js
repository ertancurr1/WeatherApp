import { useQuery } from "@tanstack/react-query";
import { fetchCurrentWeather, fetchForecast } from "../api/weatherApi";

// Hook for fetching current weather
export const useCurrentWeather = (cityName) => {
  return useQuery({
    queryKey: ["currentWeather", cityName],
    queryFn: () => fetchCurrentWeather(cityName),
    enabled: !!cityName, // Only run the query if cityName is provided
    retry: 1, // Only retry once on failure
  });
};

// Hook for fetching weather forecast
export const useForecast = (cityName) => {
  return useQuery({
    queryKey: ["forecast", cityName],
    queryFn: () => fetchForecast(cityName),
    enabled: !!cityName,
    retry: 1,
  });
};

// Helper function to process forecast data into daily forecasts
export const processForecastData = (forecastData) => {
  if (!forecastData || !forecastData.list) return [];

  const dailyForecasts = {};

  // Group forecasts by day
  forecastData.list.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toISOString().split("T")[0]; // YYYY-MM-DD format

    if (!dailyForecasts[day]) {
      dailyForecasts[day] = {
        date: day,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        weather: forecast.weather[0],
        dt: forecast.dt,
      };
    } else {
      // Update min/max temperature
      dailyForecasts[day].temp_min = Math.min(
        dailyForecasts[day].temp_min,
        forecast.main.temp_min
      );
      dailyForecasts[day].temp_max = Math.max(
        dailyForecasts[day].temp_max,
        forecast.main.temp_max
      );
    }
  });

  // Convert to array and sort by date
  return Object.values(dailyForecasts)
    .sort((a, b) => a.dt - b.dt)
    .slice(0, 5); // Get only 5 days
};
