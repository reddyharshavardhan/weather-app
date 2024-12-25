import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const Mainweather = ({ weatherData }) => {
  const temperatureCelsius = weatherData?.main?.temp || "N/A";
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
      })
    : "Date not available";

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${hours % 12 || 12}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;
      setCurrentTime(formattedTime);
    };

    // Update time every second
    const timer = setInterval(updateTime, 1000);
    updateTime();

    // Cleanup the interval
    return () => clearInterval(timer);
  }, []);

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
        width: "160px", // Reduced width
        padding: "20px", // Reduced padding
      }}
    >
      <div style={{ fontSize: "18px" }}>Now</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "28px", // Reduced font size
          fontWeight: "bold",
        }}
      >
        {temperatureCelsius}°c
        {renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: "13px", marginTop: "8px", fontWeight: "50" }}>
        {weatherDescription}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CalendarMonthIcon />
          <span>
            {currentDate} {currentTime}
          </span>
        </div>
        <div style={{ marginTop: "4px", display: "flex", alignItems: "center" }}>
          <LocationOnIcon />
          {cityName}, {countryName}
        </div>
      </div>
    </div>
  );
};

export default Mainweather;
