import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import "./WeatherApp.css";

// Atomic Components
import LoadingSpinner from "./atoms/LoadingSpinner";
import ErrorDisplay from "./atoms/ErrorDisplay";
import CitySelector from "./atoms/CitySelector";
import UnitToggle from "./atoms/UnitToggle";
import ForecastDay from "./atoms/ForecastDay";

// Molecular Components
import WeatherEffectRenderer from "./molecules/WeatherEffectRenderer";
import CurrentWeatherDisplay from "./molecules/CurrentWeatherDisplay";
import { processForecastData } from "../helper/WeatherHelper";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    visibility: number;
    icon: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
}

interface City {
  name: string;
  lat: number;
  lon: number;
}

const cities: City[] = [
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
];



const WeatherAppComponent = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  // Get weather type for effects - works with both English and Japanese
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



  const getBackgroundClass = () => {
    if (!weatherData) return 'bg-clear';

    const weatherType = getWeatherType(weatherData.current.condition, weatherData.current.icon);
    return `bg-${weatherType}`;
  };

  // Replace with your OpenWeatherMap API key
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const convertTemp = (
    temp: number,
    fromUnit: "celsius" | "fahrenheit" = "celsius"
  ) => {
    if (unit === "fahrenheit") {
      return fromUnit === "celsius" ? (temp * 9) / 5 + 32 : temp;
    }
    return fromUnit === "fahrenheit" ? ((temp - 32) * 5) / 9 : temp;
  };

  // const fetchWeatherData = async (city: City) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     // Fetch current weather
  //     const currentResponse = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&lang=ja&appid=${API_KEY}&units=metric`
  //     );

  //     if (!currentResponse.ok) {
  //       throw new Error(`HTTP error! status: ${currentResponse.status}`);
  //     }

  //     const currentData = await currentResponse.json();

  //     // Fetch 5-day forecast
  //     const forecastResponse = await fetch(
  //       `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&lang=ja&appid=${API_KEY}&units=metric`
  //     );

  //     if (!forecastResponse.ok) {
  //       throw new Error(`HTTP error! status: ${forecastResponse.status}`);
  //     }

  //     const forecastData = await forecastResponse.json();

  //     // Process forecast data to get daily forecasts
  //     const dailyForecasts = processForecastData(forecastData.list);

  //     const weatherData: WeatherData = {
  //       location: `${currentData.name}, ${currentData.sys.country}`,
  //       current: {
  //         temp: currentData.main.temp,
  //         condition: currentData.weather[0].description,
  //         humidity: currentData.main.humidity,
  //         windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
  //         visibility: Math.round(currentData.visibility / 1000), // Convert m to km
  //         icon: currentData.weather[0].icon,
  //       },
  //       forecast: dailyForecasts,
  //     };

  //     setWeatherData(weatherData);
  //   } catch (err) {
  //     console.error("Error fetching weather data:", err);
  //     setError(
  //       "Failed to fetch weather data. Please check your internet connection and try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchWeatherData = async (city: City) => {
    setLoading(true);
    setError(null);

    try {
      // Simulated data for demo purposes with proper weather conditions and icons
      const weatherConditions = [
        { condition: "clear sky", icon: "01d" },
        { condition: "few clouds", icon: "02d" },
        { condition: "light rain", icon: "10d" },
        { condition: "overcast clouds", icon: "04d" },
        { condition: "thunderstorm", icon: "11d" },
        { condition: "snow", icon: "13d" },
        { condition: "mist", icon: "50d" },
      ];

      // Different weather for different cities to make it more interesting
      const cityWeatherMap: { [key: string]: number } = {
        "Tokyo": 0, // clear sky
        "New York": 2, // light rain
        "London": 3, // overcast clouds
        "Sydney": 1, // few clouds
        "Paris": 4, // thunderstorm
        "Los Angeles": 0, // clear sky
        "Dubai": 5, // clear sky
        "Singapore": 6, // mist
      };

      const weatherIndex = cityWeatherMap[city.name] || 0;
      const currentWeather = weatherConditions[weatherIndex];

      const mockWeatherData: WeatherData = {
        location: city.name,
        current: {
          temp: Math.round(Math.random() * 30 + 5),
          condition: currentWeather.condition,
          humidity: Math.round(Math.random() * 40 + 40),
          windSpeed: Math.round(Math.random() * 15 + 5),
          visibility: Math.round(Math.random() * 5 + 5),
          icon: currentWeather.icon,
        },
        forecast: Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          const forecastWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
          return {
            date: date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            }),
            high: Math.round(Math.random() * 20 + 15),
            low: Math.round(Math.random() * 15 + 5),
            condition: forecastWeather.condition,
            icon: forecastWeather.icon,
          };
        }),
      };

      setWeatherData(mockWeatherData);
    } catch (err) {
      console.log({ err });

      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(selectedCity);
  }, [selectedCity]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = cities.find((c) => c.name === event.target.value);
    if (city) {
      setSelectedCity(city);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => fetchWeatherData(selectedCity)} />;
  }

  if (!weatherData) return null;

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <WeatherEffectRenderer
        condition={weatherData.current.condition}
        icon={weatherData.current.icon}
      />
      <div className="content-wrapper">
        {/* Header */}
        <div className="header-section">
          <div className="header-content">
            <CitySelector
              cities={cities}
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </div>
        </div>

        {/* Current Weather */}
        <CurrentWeatherDisplay
          temperature={convertTemp(weatherData.current.temp)}
          condition={weatherData.current.condition}
          location={weatherData.location}
          humidity={weatherData.current.humidity}
          windSpeed={weatherData.current.windSpeed}
          visibility={weatherData.current.visibility}
          icon={weatherData.current.icon}
          unit={unit}
        />

        {/* 7-Day Forecast */}
        <div className="forecast-section">
          <div className="forecast-header">
            <Calendar className="calendar-icon" size={24} />
            <h2 className="forecast-title">7日間の予想</h2>
          </div>

          <div className="forecast-grid">
            {weatherData.forecast.map((day, index) => (
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
      </div>
    </div>
  );
};

export default WeatherAppComponent;
