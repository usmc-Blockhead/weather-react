import axios from "axios";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeatherData(endpoint, place_id, measurementSystem) {
    if (!API_KEY) {
        throw new Error("Weather API key is not configured. Please check your .env file.");
    }

    const options = {
        method: "GET",
        url: `https://ai-weather-by-meteosource.p.rapidapi.com/${endpoint}`,
        params: {
            place_id,
            language: "en",
            units: measurementSystem,
        },
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
}

export async function searchPlaces(text) {
    if (!API_KEY) {
        throw new Error("Weather API key is not configured. Please check your .env file.");
    }

    const options = {
        method: "GET",
        url: "https://ai-weather-by-meteosource.p.rapidapi.com/find_places",
        params: {
            text,
            language: "en",
        },
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": "ai-weather-by-meteosource.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        if (error.response?.status === 429) {
            throw new Error("API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Failed to search places: ${error.message}`);
    }
}