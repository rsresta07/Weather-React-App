import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

/**
 * Component for displaying weather forecast information.
 * @param {Object} data - Object containing weather forecast data.
 * @returns {JSX.Element} Weather forecast component.
 */
const Forecast = ({ data }) => {
    // Array of week days
    const WEEK_DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Get the current day of the week
    const currentDate = new Date();
    const dayInAWeek = currentDate.getDay();

    // Create an array of forecast days starting from the current day
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
        WEEK_DAYS.slice(0, dayInAWeek)
    );

    return (
        <>
            {/* Title for the forecast section */}
            <label className="title">Daily</label>

            {/* Accordion component to display daily forecast */}
            <Accordion allowZeroExpanded>
                {/* Map through forecast data to render each day */}
                {data.list.slice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        {/* Heading for each accordion item */}
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                {/* Content of each accordion item */}
                                <div className="daily-item">
                                    {/* Weather icon */}
                                    <img
                                        alt="weather"
                                        className="icon-small"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    {/* Day of the week */}
                                    <label className="day">
                                        {forecastDays[idx]}
                                    </label>
                                    {/* Weather description */}
                                    <label className="description">
                                        {item.weather[0].description}
                                    </label>
                                    {/* Temperature range */}
                                    <label className="min-max">
                                        {Math.round(item.main.temp_min)}°C /{" "}
                                        {Math.round(item.main.temp_max)}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>

                        {/* Panel content for each accordion item */}
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                {/* Weather details */}
                                <div className="daily-details-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure} hPa</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Wind Speed</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sea Level</label>
                                    <label>{item.main.sea_level} m</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Feels Like</label>
                                    <label>
                                        {Math.round(item.main.feels_like)}°C
                                    </label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
};

export default Forecast;
