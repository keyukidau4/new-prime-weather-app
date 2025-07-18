import React from "react";
import { LucideIcon } from "lucide-react";

interface WeatherDetailProps {
  icon: LucideIcon;
  value: string | number;
  unit?: string;
}

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon: Icon, value, unit = "" }) => {
  return (
    <div className="weather-detail">
      <Icon size={20} />
      <span className="detail-text">
        {value}{unit}
      </span>
    </div>
  );
};

export default WeatherDetail;