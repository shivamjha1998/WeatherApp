import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { fetchWeather, fetchHourlyForecast } from "../services/WeatherService";
import SunGradient from "../components/SunGradient";

const { width, height } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState("Mumbai");
  const [weather, setWeather] = useState<any>(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  // For the chart, only 5 points
  const [chartData, setChartData] = useState<{ labels: string[]; temps: number[] }>({
    labels: [],
    temps: [],
  });

  useEffect(() => {
    getWeather(city);
    getTodaysDate();
  }, [city]);

  useEffect(() => {
    if (weather?.coord) {
      getHourlyWeather(weather.coord.lat, weather.coord.lon);
    }
  }, [weather]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getTodaysDate();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getWeather = async (cityName: string) => {
    try {
      const weatherData = await fetchWeather(cityName);
      setWeather(weatherData);
    } catch (error) {
      console.error("Error while fetching weather", error);
    }
  };

  const getHourlyWeather = async (lat: number, lon: number) => {
    try {
      const forecast = await fetchHourlyForecast(lat, lon);

      // Take only the next 5 items (instead of 8)
      const nextHours = forecast.hourly.slice(0, 5);

      const labels = nextHours.map((item: any) => {
        const dateObj = new Date(item.dt * 1000);
        const hour24 = dateObj.getHours(); // 0..23
        const hour12 = hour24 % 12 || 12;
        const ampm = hour24 >= 12 ? "PM" : "AM";

        // e.g. "3 PM" or just hour12 if you prefer
        return `${hour12} ${ampm}`;
      });

      const temps = nextHours.map((item: any) => item.temp);

      setChartData({ labels, temps });
    } catch (error) {
      console.error("Error while fetching hourly temperature", error);
    }
  };

  const getTodaysDate = () => {
    const currentDate = new Date();
    const dayOfWeekNumber = currentDate.getDay();
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    setDay(weekdays[dayOfWeekNumber]);

    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    setTime(formattedTime);
  };

  return (
    <View style={styles.container}>

      {/* Vertical text */}
      {weather && (
        <View style={styles.verticalTextContainer}>
          {weather.weather[0].description
            .toUpperCase()
            .split("")
            .map((char: string, index: number) => (
              <Text key={index} style={styles.verticalText}>
                {char}
              </Text>
            ))}
        </View>
      )}

      {/* Temperature */}
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.temperature}>
            {Math.round(weather.main.temp)}
            <Text style={styles.degree}>°C</Text>
          </Text>
        </View>
      )}

        <View style={styles.backgroundContainer}>
        <SunGradient />
      </View>

      {/* City name, day and time */}
      {weather && (
        <View style={styles.cityTime}>
          <Text style={styles.cityName}>{weather.name.toUpperCase()}</Text>
          <Text style={styles.dayAndTime}>
            {day} {time}
          </Text>
        </View>
      )}

      {/* Feels like / Wind / Humidity */}
      {weather && (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Feels Like</Text>
            <Text style={styles.value}>{Math.round(weather.main.feels_like)}°C</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Wind</Text>
            <Text style={styles.value}>{(weather.wind.speed * 3.6).toFixed(1)} Km/h</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Text style={styles.label}>Humidity</Text>
            <Text style={styles.value}>{weather.main.humidity}%</Text>
          </View>
        </View>
      )}

      { weather && (
        <View style={styles.graphContainer}>
          {chartData.temps.length > 0 && (
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{ data: chartData.temps }],
              }}
              width={width}
              height={180}
              fromZero={true}
              withHorizontalLabels={false}
              withVerticalLabels={true}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                color: (opacity = 1) => `rgba(255,153,86, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(71,63,56, ${opacity})`,
                propsForDots: {
                  r: "5",
                  strokeWidth: "1",
                  stroke: "#ffa726",
                },
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 20,
                  height: 50,
                },
              }}
              style={{
                top: 300,
                left: 10,
                marginBottom: 20,
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf0e3",
    zIndex: -2,
  },
  weatherContainer: {
    marginTop: 70 ,
    marginLeft: 30,
  },
  temperature: {
    fontSize: 80,
    fontFamily: "Monomakh-Regular",
    color: "#473f38",
  },
  degree: {
    fontSize: 40,
    fontFamily: "Monomakh-Regular",
  },
  backgroundContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  cityTime: {
    marginTop: -20
  },
  cityName: {
    fontSize: 40,
    fontFamily: "Monomakh",
    color: "#473f38",
    fontWeight: "bold",
    letterSpacing: 3,
  },
  dayAndTime: {
    fontSize: 15,
    fontFamily: "Inter",
    color: "#473f38",
    letterSpacing: 2,
  },
  infoContainer: {
    bottom: 280,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoRow: {
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#473f38",
    fontFamily: "Inter",
  },
  value: {
    marginTop: 10,
    fontSize: 15,
    color: "#473f38",
    fontFamily: "Inter",
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: "#ff9956",
  },
  verticalTextContainer: {
    position: "absolute",
    top: 150,
    right: 30,
  },
  verticalText: {
    fontSize: 18,
    color: "#473f38",
    fontFamily: "SpaceMono",
  },
  graphContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    top: 300,
    flex: 0,
  },
});
