import axios from "axios";

// OpenWeatherMap API configuration
const API_KEY = "5031f3cc7152142fa39b4355e03e25e8";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Create an Axios instance with default settings
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric", // Use metric units by default (celsius)
  },
});

// Function to fetch current weather data
export const fetchCurrentWeather = async (cityName) => {
  try {
    const response = await weatherApi.get("/weather", {
      params: { q: cityName },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw error;
  }
};

// Function to fetch weather forecast data
export const fetchForecast = async (cityName) => {
  try {
    const response = await weatherApi.get("/forecast", {
      params: { q: cityName },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};

export default {
  fetchCurrentWeather,
  fetchForecast,
};
