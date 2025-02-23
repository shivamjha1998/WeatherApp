import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
} from "react-native";
import fetchWeather from "../services/WeatherService";
import SunGradient from "../components/SunGradient";

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    getWeather(city);
  },[]);

  const getWeather = async (cityName: string) => {
    try{
      const weatherData = await fetchWeather(cityName);
      setWeather(weatherData);
    } catch (error) {
      console.error("Error while fetching weather");
    }
  };

  return(
    <View style={styles.container}>
      <SunGradient />

      {/* Temperature & Condition */}
      {weather &&(
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}
            <Text style={styles.degree}>°C</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fbf0e3"
  },
  weatherContainer:{
    position: "absolute",
    top: 70,
    left: 30,
  },
  temperature:{
    fontSize: 80,
    fontFamily: "Monomakh-Regular",
    color: "#473f38"
  },
  degree: {
    fontSize: 40,
    fontFamily: "Monomakh-Regular",
  },
})

export default HomeScreen;