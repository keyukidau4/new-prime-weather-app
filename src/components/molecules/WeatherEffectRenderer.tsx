import React from "react";
import SunEffect from "../effects/SunEffect";
import RainEffect from "../effects/RainEffect";
import CloudEffect from "../effects/CloudEffect";
import ThunderstormEffect from "../effects/ThunderstormEffect";
import SnowEffect from "../effects/SnowEffect";
import MistEffect from "../effects/MistEffect";

interface WeatherEffectRendererProps {
  condition: string;
  icon: string;
}

const WeatherEffectRenderer: React.FC<WeatherEffectRendererProps> = ({ condition, icon }) => {
  const getWeatherType = (condition: string, icon: string) => {
    // Primary detection using weather icon codes (language-independent)
    const iconCode = icon.substring(0, 2); // Remove day/night indicator
    
    switch (iconCode) {
      case '01': // Clear sky
        return 'clear';
      case '02': // Few clouds
      case '03': // Scattered clouds
      case '04': // Broken clouds
        return 'clouds';
      case '09': // Shower rain
      case '10': // Rain
        return 'rain';
      case '11': // Thunderstorm
        return 'thunderstorm';
      case '13': // Snow
        return 'snow';
      case '50': // Mist/Fog
        return 'mist';
      default:
        break;
    }
    
    // Fallback to text-based detection for both English and Japanese
    const conditionLower = condition.toLowerCase();
    
    // Rain detection (English and Japanese)
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle") ||
        conditionLower.includes("雨") || conditionLower.includes("小雨") || 
        conditionLower.includes("大雨") || conditionLower.includes("霧雨")) {
      return "rain";
    }
    
    // Snow detection (English and Japanese)
    if (conditionLower.includes("snow") || conditionLower.includes("雪") ||
        conditionLower.includes("吹雪") || conditionLower.includes("小雪")) {
      return "snow";
    }
    
    // Thunderstorm detection (English and Japanese)
    if (conditionLower.includes("thunder") || conditionLower.includes("storm") ||
        conditionLower.includes("雷") || conditionLower.includes("雷雨") ||
        conditionLower.includes("嵐")) {
      return "thunderstorm";
    }
    
    // Cloud detection (English and Japanese)
    if (conditionLower.includes("cloud") || conditionLower.includes("overcast") ||
        conditionLower.includes("曇") || conditionLower.includes("雲") ||
        conditionLower.includes("くもり")) {
      return "clouds";
    }
    
    // Mist/Fog detection (English and Japanese)
    if (conditionLower.includes("mist") || conditionLower.includes("fog") || 
        conditionLower.includes("haze") || conditionLower.includes("霧") ||
        conditionLower.includes("もや") || conditionLower.includes("かすみ")) {
      return "mist";
    }
    
    // Clear weather detection (English and Japanese)
    if (conditionLower.includes("clear") || conditionLower.includes("sun") ||
        conditionLower.includes("晴") || conditionLower.includes("快晴")) {
      return "clear";
    }
    
    // Default to clear if nothing matches
    return "clear";
  };

  const weatherType = getWeatherType(condition, icon);
  
  switch (weatherType) {
    case 'clear':
      return <SunEffect />;
    case 'rain':
      return <RainEffect />;
    case 'clouds':
      return <CloudEffect />;
    case 'thunderstorm':
      return <ThunderstormEffect />;
    case 'snow':
      return <SnowEffect />;
    case 'mist':
      return <MistEffect />;
    default:
      return <SunEffect />;
  }
};

export default WeatherEffectRenderer;