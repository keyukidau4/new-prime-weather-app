import React from "react";
import { Droplets, Wind, Eye } from "lucide-react";
import WeatherIcon from "../atoms/WeatherIcon";
import WeatherDetail from "../atoms/WeatherDetail";

interface CurrentWeatherData {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
}

interface CurrentWeatherCardProps {
  weatherData: CurrentWeatherData;
  location: string;
  unit: "celsius" | "fahrenheit";
  convertTemp: (temp: number) => number;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weatherData,
  location,
  unit,
  convertTemp,
}) => {
  return (
    <div className="current-weather">
      <div className="current-weather-content">
        <div className="current-weather-main">
          <WeatherIcon
            condition={weatherData.condition}
            icon={weatherData.icon}
            size={80}
          />
          <div className="current-weather-info">
            <h1 className="current-temp">
              {Math.round(convertTemp(weatherData.temp))}°
              {unit === "celsius" ? "C" : "F"}
            </h1>
            <p className="current-condition">
              {weatherData.condition}
            </p>
            <p className="current-location">{location}</p>
          </div>
        </div>

        <div className="weather-details">
          <WeatherDetail
            icon={Droplets}
            value={weatherData.humidity}
            unit="%"
          />
          <WeatherDetail
            icon={Wind}
            value={weatherData.windSpeed}
            unit=" km/h"
          />
          <WeatherDetail
            icon={Eye}
            value={weatherData.visibility}
            unit=" km"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;