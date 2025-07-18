import React from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Eye,
} from "lucide-react";

interface WeatherIconProps {
  condition: string;
  size?: number;
  icon?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  size = 48,
  icon,
}) => {
  const iconProps = { size };

  // Primary detection using weather icon codes (language-independent)
  if (icon) {
    const iconCode = icon.substring(0, 2);
    switch (iconCode) {
      case '01': // Clear sky
        return <Sun {...iconProps} className="weather-icon sunny" />;
      case '02': // Few clouds
      case '03': // Scattered clouds
      case '04': // Broken clouds
        return <Cloud {...iconProps} className="weather-icon cloudy" />;
      case '09': // Shower rain
      case '10': // Rain
        return <CloudRain {...iconProps} className="weather-icon rain" />;
      case '11': // Thunderstorm
        return <CloudLightning {...iconProps} className="weather-icon storm" />;
      case '13': // Snow
        return <CloudSnow {...iconProps} className="weather-icon snow" />;
      case '50': // Mist/Fog
        return <Eye {...iconProps} className="weather-icon cloudy" />;
    }
  }

  // Fallback to text-based detection for both English and Japanese
  const conditionLower = condition.toLowerCase();

  // Rain detection (English and Japanese)
  if (conditionLower.includes("rain") || conditionLower.includes("drizzle") ||
      conditionLower.includes("雨") || conditionLower.includes("小雨") || 
      conditionLower.includes("大雨") || conditionLower.includes("霧雨")) {
    return <CloudRain {...iconProps} className="weather-icon rain" />;
  }

  // Snow detection (English and Japanese)
  if (conditionLower.includes("snow") || conditionLower.includes("雪") ||
      conditionLower.includes("吹雪") || conditionLower.includes("小雪")) {
    return <CloudSnow {...iconProps} className="weather-icon snow" />;
  }

  // Thunderstorm detection (English and Japanese)
  if (conditionLower.includes("thunder") || conditionLower.includes("storm") ||
      conditionLower.includes("雷") || conditionLower.includes("雷雨") ||
      conditionLower.includes("嵐")) {
    return <CloudLightning {...iconProps} className="weather-icon storm" />;
  }

  // Cloud detection (English and Japanese)
  if (conditionLower.includes("cloud") || conditionLower.includes("overcast") ||
      conditionLower.includes("曇") || conditionLower.includes("雲") ||
      conditionLower.includes("くもり")) {
    return <Cloud {...iconProps} className="weather-icon cloudy" />;
  }

  // Mist/Fog detection (English and Japanese)
  if (conditionLower.includes("mist") || conditionLower.includes("fog") || 
      conditionLower.includes("haze") || conditionLower.includes("霧") ||
      conditionLower.includes("もや") || conditionLower.includes("かすみ")) {
    return <Eye {...iconProps} className="weather-icon cloudy" />;
  }

  // Clear weather detection (English and Japanese)
  if (conditionLower.includes("clear") || conditionLower.includes("sun") ||
      conditionLower.includes("晴") || conditionLower.includes("快晴")) {
    return <Sun {...iconProps} className="weather-icon sunny" />;
  }

  // Default fallback
  return <Cloud {...iconProps} className="weather-icon cloudy" />;
};

export default WeatherIcon;