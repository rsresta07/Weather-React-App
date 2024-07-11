import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api.js";

/**
 * Component for searching cities asynchronously.
 * @param {Function} onSearchChange - Callback function to handle search changes.
 * @returns {JSX.Element} Search component.
 */
const Search = ({ onSearchChange }) => {
    // State variable to store search input
    const [search, setSearch] = useState(null);

    /**
     * Function to asynchronously load city options based on search input.
     * @param {string} inputValue - Search input value.
     * @returns {Promise<Array>} Promise resolving to an array of city options.
     */
    const loadOptions = async (inputValue) => {
        // Construct URL for fetching city data
        const url = `${GEO_API_URL}?minPopulation=100000&namePrefix=${inputValue}`;
        console.log(`Requesting URL: ${url}`); // Debug line to print URL

        try {
            // Fetch city data from the API
            const response = await fetch(url, geoApiOptions);
            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            // Parse response data
            const responseData = await response.json();

            // Check if response data is valid
            if (!responseData || !responseData.data) {
                return {
                    options: [],
                };
            }

            // Map city data to options array
            return {
                options: responseData.data.map((city) => ({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                })),
            };
        } catch (err) {
            console.error(err);
            return {
                options: [],
            };
        }
    };

    /**
     * Handler function for search input changes.
     * @param {Object} searchData - Selected city data.
     */
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    // Render the search component
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
};

export default Search;
