import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderWeatherIcon = (description) => {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return '🌞';
      case 'few clouds':
        return '🌤️';
      case 'scattered clouds':
        return '☁️';
      case 'broken clouds':
        return '☁️';
      case 'shower rain':
        return '🌧️';
      case 'rain':
        return '🌧️';
      case 'thunderstorm':
        return '⚡';
      case 'snow':
        return '❄️';
      case 'mist':
        return '🌫️';
      default:
        return '🌤️';
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#4B5563",
        color: "white",
        borderRadius: "0.75rem",
        width: "100%",
        maxWidth: "500px", 
        padding: "11px",
        display: "flex",
        flexDirection: "column",
        gap: "13px", 
        overflowWrap: "break-word",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
        margin: "auto", 
      }}
    >
      {forecastData.list.slice(0, 5).map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px", 
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            padding: "8px", 
            backgroundColor: "#2D3748", 
            borderRadius: "0.5rem", 
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            {/* Display temperature, date, time, icon, and weather description */}
            <strong>{Math.round(item.main.temp)}°C</strong> {formatDate(item.dt_txt)} {formatTime(item.dt_txt)} {renderWeatherIcon(item.weather[0].description)} {item.weather[0].description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
