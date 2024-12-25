import React, { useState, useEffect } from "react";
import Navbar from "../src/Components/Navbar";
import Mainweather from "../src/Components/Mainweather";
import FiveDayForecast from "../src/Components/fiveday";
import TodayHighlights from "../src/Components/TodayHighlights";
import axios from "axios";

// Component to display weather for different countries
const CountryWeather = ({ country }) => {
  const [countryWeather, setCountryWeather] = useState(null);

  useEffect(() => {
    const fetchCountryWeather = () => {
      const API_KEY = "c82df46189a242552803c33ada57334c";
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          setCountryWeather(response.data);
        })
        .catch((error) => console.error(`Error fetching weather data for ${country}:`, error));
    };
    fetchCountryWeather();
  }, [country]);

  if (!countryWeather) {
    return <div>Loading weather data for {country}...</div>;
  }

  const temperatureCelsius = countryWeather.main.temp;
  const weatherDescription = countryWeather.weather[0].description;
  const cityName = countryWeather.name;
  const countryName = countryWeather.sys.country;

  const renderTemperatureIcon = () => {
    if (temperatureCelsius >= 30) {
      return <span style={{ color: "red" }}>🔥</span>;
    } else if (temperatureCelsius >= 20) {
      return <span style={{ color: "orange" }}>🌤️</span>;
    } else {
      return <span style={{ color: "blue" }}>🌧️</span>;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.5rem",
        width: "200px",
        padding: "30px",
        marginBottom: "20px",
      }}
    >
      <div style={{ fontSize: "20px", marginBottom: "10px" }}>Now</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "35px",
          fontWeight: "bold",
        }}
      >
        {temperatureCelsius}°c {renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: "15px", marginTop: "8px" }}>{weatherDescription}</div>
      <div style={{ marginTop: "1rem" }}>
        <div>{cityName}, {countryName}</div>
      </div>
    </div>
  );
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Bengaluru");;
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [checked, setChecked] = useState(false); // Theme toggle state

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = "c82df46189a242552803c33ada57334c";
    axios
      .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching the air quality data:", error));
  };

  const fetchWeatherData = (query) => {
    const API_KEY = "c82df46189a242552803c33ada57334c";

    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;
    if (typeof query === "string") {
      url += `&q=${query}`;
    } else if (query.lat && query.lon) {
      url += `&lat=${query.lat}&lon=${query.lon}`;
    }

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);

        axios
          .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`)
          .then((response) => {
            setFiveDayForecast(response.data);
          })
          .catch((error) => console.error("Error fetching the 5-day forecast data:", error));
      })
      .catch((error) => console.error("Error fetching the weather data:", error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData({ lat: latitude, lon: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch location. Please ensure location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleThemeChange = () => {
    setChecked(!checked); // Toggle theme
  };

  const themeStyles = {
    light: {
      backgroundColor: "white",
      color: "black",
    },
    dark: {
      backgroundColor: "#121212",
      color: "white",
    },
  };

  return (
    <div style={checked ? themeStyles.dark : themeStyles.light}>
      <Navbar onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} onThemeChange={handleThemeChange} checked={checked} />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <Mainweather weatherData={weatherData} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
      
      {/* Display weather for other countries */}
      <div style={{ marginTop: "30px", display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <CountryWeather country="France" />
        <CountryWeather country="Germany" />
        <CountryWeather country="Italy" />
        <CountryWeather country="Japan" />
        <CountryWeather country="Mexico" />
      </div>
    </div>
  );
};

export default WeatherDashboard;
