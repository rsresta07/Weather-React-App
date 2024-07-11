import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

/**
 * Main application component.
 * Handles the rendering of search, current weather, and forecast components.
 * Makes API calls to fetch current weather and forecast data based on user's search input.
 */
function App() {
    // State variables to store current weather and forecast data
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    /**
     * Callback function invoked when the user changes the search input.
     * Fetches current weather and forecast data for the selected location.
     * @param {Object} searchData - Selected location data containing latitude and longitude.
     */
    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        // Fetch current weather data
        const currentWeatherFetch = fetch(
            `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Fetch forecast data
        const forecastFetch = fetch(
            `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        // Handle concurrent API requests using Promise.all
        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                // Update state with current weather and forecast data
                setCurrentWeather({
                    city: searchData.label,
                    ...weatherResponse,
                });
                setForecast({ city: searchData.label, ...forecastResponse });
            })
            .catch((err) => console.log(err));
    };

    // Render the main container and components
    return (
        <div className="container">
            {/* Render the search component and pass callback function */}
            <Search onSearchChange={handleOnSearchChange} />

            {/* Render the current weather component if data is available */}
            {currentWeather && <CurrentWeather data={currentWeather} />}

            {/* Render the forecast component if data is available */}
            {forecast && <Forecast data={forecast} />}
        </div>
    );
}

// Export the App component as default
export default App;
