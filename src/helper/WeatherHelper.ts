// Define interfaces for the API response structure
interface WeatherCondition {
  description: string;
  icon: string;
}

interface MainWeatherData {
  temp: number;
}

interface ForecastItem {
  dt: number;
  weather: WeatherCondition[];
  main: MainWeatherData;
}

interface DailyWeatherData {
  date: string;
  temps: number[];
  condition: string;
  icon: string;
}

interface ProcessedDayData {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export const processForecastData = (forecastList: ForecastItem[]): ProcessedDayData[] => {
  const dailyData: { [key: string]: DailyWeatherData } = {};
  
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!dailyData[dateKey]) {
      dailyData[dateKey] = {
        date: date.toLocaleDateString('ja-JP', { weekday: 'short', month: 'short', day: 'numeric' }),
        temps: [],
        condition: item.weather[0].description,
        icon: item.weather[0].icon
      };
    }
    
    dailyData[dateKey].temps.push(item.main.temp);
  });
  
  return Object.values(dailyData).slice(0, 7).map((day: DailyWeatherData): ProcessedDayData => ({
    date: day.date,
    high: Math.round(Math.max(...day.temps)),
    low: Math.round(Math.min(...day.temps)),
    condition: day.condition,
    icon: day.icon
  }));
};