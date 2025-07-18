import React from "react";
import WeatherIcon from "./WeatherIcon";

interface ForecastDayProps {
  date: string;
  condition: string;
  icon: string;
  high: number;
  low: number;
  convertTemp: (temp: number) => number;
}

const ForecastDay: React.FC<ForecastDayProps> = ({
  date,
  condition,
  icon,
  high,
  low,
  convertTemp,
}) => {
  return (
    <div className="forecast-day">
      <p className="forecast-date">{date}</p>
      <div className="forecast-icon">
        <WeatherIcon condition={condition} icon={icon} size={40} />
      </div>
      <p className="forecast-condition">{condition}</p>
      <div className="forecast-temps">
        <p className="forecast-high">
          {Math.round(convertTemp(high))}°
        </p>
        <p className="forecast-low">
          {Math.round(convertTemp(low))}°
        </p>
      </div>
    </div>
  );
};

export default ForecastDay;