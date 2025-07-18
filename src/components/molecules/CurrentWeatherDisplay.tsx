import React from "react";
import WeatherIcon from "../atoms/WeatherIcon";
import WeatherDetail from "../atoms/WeatherDetail";
import { Droplets, Wind, Eye } from "lucide-react";

interface CurrentWeatherDisplayProps {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  icon: string;
  unit: "celsius" | "fahrenheit";
}

const CurrentWeatherDisplay: React.FC<CurrentWeatherDisplayProps> = ({
  temperature,
  condition,
  location,
  humidity,
  windSpeed,
  visibility,
  icon,
  unit,
}) => {
  return (
    <div className="current-weather">
      <div className="current-weather-content">
        <div className="current-weather-main">
          <WeatherIcon condition={condition} size={80} icon={icon} />
          <div className="current-weather-info">
            <h1 className="current-temp">
              {Math.round(temperature)}°{unit === "celsius" ? "C" : "F"}
            </h1>
            <p className="current-condition">{condition}</p>
            <p className="current-location">{location}</p>
          </div>
        </div>

        <div className="weather-details">
          <WeatherDetail icon={Droplets} value={humidity} unit="%" />
          <WeatherDetail icon={Wind} value={windSpeed} unit=" km/h" />
          <WeatherDetail icon={Eye} value={visibility} unit=" km" />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;