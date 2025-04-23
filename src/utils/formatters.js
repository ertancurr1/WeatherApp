/**
 * Format temperature with the degree symbol
 * @param {number} temp - Temperature value
 * @param {boolean} showUnit - Whether to show the unit (°C)
 * @returns {string} Formatted temperature
 */
export const formatTemperature = (temp, showUnit = true) => {
  if (temp === undefined || temp === null) return "--";
  return `${Math.round(temp)}${showUnit ? "°C" : "°"}`;
};

/**
 * Format wind speed with unit
 * @param {number} speed - Wind speed in m/s
 * @returns {string} Formatted wind speed
 */
export const formatWindSpeed = (speed) => {
  if (speed === undefined || speed === null) return "--";
  return `${Math.round(speed)} m/s`;
};

/**
 * Format date based on timestamp
 * @param {number} timestamp - Unix timestamp in seconds
 * @param {Object} options - Format options for toLocaleDateString
 * @returns {string} Formatted date
 */
export const formatDate = (
  timestamp,
  options = { weekday: "long", month: "short", day: "numeric" }
) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", options);
};

/**
 * Format time based on timestamp
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted time (HH:MM)
 */
export const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get weather icon URL from OpenWeatherMap
 * @param {string} iconCode - Weather icon code
 * @param {number} size - Icon size (1x, 2x, 4x)
 * @returns {string} Weather icon URL
 */
export const getWeatherIconUrl = (iconCode, size = 2) => {
  if (!iconCode) return "";
  return `https://openweathermap.org/img/wn/${iconCode}@${size}x.png`;
};
