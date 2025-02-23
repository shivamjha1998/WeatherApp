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

export default fetchWeather;