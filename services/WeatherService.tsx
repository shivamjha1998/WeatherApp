import axios from "axios";
import { API_KEY } from "@env";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeather = async (city:string) => {
  try{
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching data:", error);
    throw error;
  }
};

const fetchHourlyForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get("https://api.openweathermap.org/data/3.0/onecall", {
      params: {
        lat: lat,
        lon: lon,
        exclude: "minutely,daily",
        units: "metric",
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error while fetching forecast data:", error);
    throw error;
  }
};


export { fetchWeather, fetchHourlyForecast};