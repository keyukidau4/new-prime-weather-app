import React from "react";
import { Calendar } from "lucide-react";
import ForecastDay from "../atoms/ForecastDay";

interface ForecastData {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

interface ForecastSectionProps {
  forecast: ForecastData[];
  convertTemp: (temp: number) => number;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({
  forecast,
  convertTemp,
}) => {
  return (
    <div className="forecast-section">
      <div className="forecast-header">
        <Calendar className="calendar-icon" size={24} />
        <h2 className="forecast-title">7日間の予想</h2>
      </div>

      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <ForecastDay
            key={index}
            date={day.date}
            condition={day.condition}
            icon={day.icon}
            high={day.high}
            low={day.low}
            convertTemp={convertTemp}
          />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;