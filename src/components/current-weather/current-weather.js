import "./current-weather.css";

/**
 * Component for displaying current weather information.
 * @param {Object} data - Object containing current weather data.
 * @returns {JSX.Element} Current weather component.
 */
const CurrentWeather = ({ data }) => {
    return (
        <div className="weather">
            {/* Top section displaying city name, weather description, and weather icon */}
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="weather-description">
                        {data.weather[0].description}
                    </p>
                </div>
                <img
                    alt="weather"
                    className="weather-icon"
                    src={`icons/${data.weather[0].icon}.png`}
                />
            </div>

            {/* Bottom section displaying temperature and weather details */}
            <div className="bottom">
                {/* Display temperature */}
                <p className="temperature">{Math.round(data.main.temp)}°C</p>

                {/* Display weather details */}
                <div className="details">
                    {/* Parameter rows */}
                    <div className="parameter-row">
                        <span className="parameter-label">Details</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value">
                            {Math.round(data.main.feels_like)}°C
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value">
                            {data.wind.speed} km/h
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value">
                            {data.main.humidity}%
                        </span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value">
                            {data.main.pressure} hPa
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
