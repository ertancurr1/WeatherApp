// Weather condition groups
export const WEATHER_CONDITIONS = {
  CLEAR: "Clear",
  CLOUDS: "Clouds",
  RAIN: "Rain",
  DRIZZLE: "Drizzle",
  THUNDERSTORM: "Thunderstorm",
  SNOW: "Snow",
  MIST: "Mist",
  FOG: "Fog",
  HAZE: "Haze",
};

// Error messages
export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: "City not found. Please check the spelling and try again.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  GENERIC_ERROR: "Something went wrong. Please try again later.",
  API_KEY_ERROR:
    "API key invalid or not activated yet. New API keys may take 2 hours to activate.",
};

// Weather info display settings
export const WEATHER_INFO = [
  { key: "humidity", label: "Humidity", unit: "%" },
  { key: "windSpeed", label: "Wind", unit: "m/s", valueKey: "speed" },
  { key: "pressure", label: "Pressure", unit: "hPa" },
  { key: "visibility", label: "Visibility", unit: "km", divideBy: 1000 },
];
