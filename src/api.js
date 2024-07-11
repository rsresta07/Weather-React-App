/**
 * URL for the Geo API to fetch city data.
 * @type {string}
 */
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

/**
 * Options for making requests to the Geo API.
 * Includes method and headers with API key and host.
 * @type {Object}
 */
export const geoApiOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": "your-api-key",
        "X-RapidAPI-Host": "the-host",
    },
};

/**
 * URL for the OpenWeatherMap API to fetch weather data.
 * @type {string}
 */
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

/**
 * API key for accessing the OpenWeatherMap API.
 * @type {string}
 */
export const WEATHER_API_KEY = "your-api-key";
