import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, CloudSnow, Zap, Eye, Thermometer } from 'lucide-react';

// Weather condition mapping từ OpenWeatherMap
const weatherConditions: {[key: string]: string} = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'overcast',
  '04n': 'overcast',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'fog',
  '50n': 'fog'
};

const WeatherBackgroundEffects = () => {
  const [currentWeather, setCurrentWeather] = useState('clear-day');
  const [weatherData, setWeatherData] = useState({
    temp: 25,
    condition: 'Clear',
    icon: '01d',
    windSpeed: 5
  });

  // Simulate weather changes for demo
  useEffect(() => {
    const conditions = ['01d', '02d', '03d', '09d', '11d', '13d', '50d'];
    let index = 0;
    
    const interval = setInterval(() => {
      const icon = conditions[index % conditions.length];
      setCurrentWeather(weatherConditions[icon]);
      setWeatherData(prev => ({
        ...prev,
        icon,
        condition: getConditionName(icon)
      }));
      index++;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getConditionName = (icon: string) => {
    const conditionMap: {[key: string]: string} = {
      '01d': 'Clear Sky',
      '02d': 'Partly Cloudy',
      '03d': 'Cloudy',
      '09d': 'Rain',
      '11d': 'Thunderstorm',
      '13d': 'Snow',
      '50d': 'Fog'
    };
    return conditionMap[icon] || 'Unknown';
  };

  const renderWeatherIcon = () => {
    switch(currentWeather) {
      case 'clear-day':
      case 'clear-night':
        return <Sun className="w-16 h-16 text-yellow-300" />;
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return <Cloud className="w-16 h-16 text-gray-300" />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-300" />;
      case 'thunderstorm':
        return <Zap className="w-16 h-16 text-yellow-300" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-white" />;
      case 'fog':
        return <Eye className="w-16 h-16 text-gray-300" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-300" />;
    }
  };

  return (
    <div className={`weather-container ${currentWeather}`}>
      <style>{`
        .weather-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          transition: all 0.5s ease;
        }

        /* Clear Day - Sunny */
        .clear-day {
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #74b9ff 100%);
        }

        .clear-day::before {
          content: '';
          position: absolute;
          top: 20%;
          left: 70%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #fdcb6e 0%, #e17055 70%);
          border-radius: 50%;
          animation: sunPulse 3s ease-in-out infinite alternate;
          box-shadow: 0 0 100px rgba(253, 203, 110, 0.5);
        }

        @keyframes sunPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        /* Partly Cloudy */
        .partly-cloudy-day {
          background: linear-gradient(135deg, #74b9ff 0%, #a29bfe 50%, #6c5ce7 100%);
        }

        .partly-cloudy-day::before {
          content: '';
          position: absolute;
          top: 15%;
          left: 20%;
          width: 150px;
          height: 80px;
          background: #ddd;
          border-radius: 50px;
          animation: cloudFloat 6s ease-in-out infinite;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .partly-cloudy-day::after {
          content: '';
          position: absolute;
          top: 10%;
          left: 60%;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, #fdcb6e 0%, #e17055 70%);
          border-radius: 50%;
          animation: sunGlow 4s ease-in-out infinite;
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(30px); }
        }

        @keyframes sunGlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        /* Cloudy */
        .cloudy, .overcast {
          background: linear-gradient(135deg, #636e72 0%, #2d3436 50%, #636e72 100%);
        }

        .cloudy::before, .overcast::before {
          content: '';
          position: absolute;
          top: 10%;
          left: 10%;
          width: 200px;
          height: 100px;
          background: #95a5a6;
          border-radius: 50px;
          animation: cloudDrift 8s ease-in-out infinite;
          box-shadow: 
            150px 20px 0 -20px #95a5a6,
            300px 0px 0 -30px #95a5a6,
            450px 30px 0 -25px #95a5a6;
        }

        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-50px); }
        }

        /* Rain */
        .rain {
          background: linear-gradient(135deg, #4a5568 0%, #2d3748 50%, #1a202c 100%);
          overflow: hidden;
        }

        .rain::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: calc(100% + 200px);
          height: calc(100% + 200px);
          background: 
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.7) 49%, rgba(255,255,255,0.7) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.6) 49%, rgba(255,255,255,0.6) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.5) 50%, transparent 51%);
          background-size: 30px 100px, 40px 120px, 35px 110px;
          background-position: 0 0, 15px 0, 30px 0;
          animation: rainDrop 0.5s linear infinite;
        }

        .rain::after {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: calc(100% + 200px);
          height: calc(100% + 200px);
          background: 
            linear-gradient(110deg, transparent 48%, rgba(200,220,255,0.8) 49%, rgba(200,220,255,0.8) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(200,220,255,0.7) 49%, rgba(200,220,255,0.7) 50%, transparent 51%);
          background-size: 25px 80px, 20px 90px;
          background-position: 10px 0, 50px 0;
          animation: rainDrop 0.3s linear infinite;
        }

        @keyframes rainDrop {
          0% { transform: translateY(-100px) translateX(50px); }
          100% { transform: translateY(100vh) translateX(-50px); }
        }

        /* Thunderstorm */
        .thunderstorm {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 30%, #1a202c 100%);
          overflow: hidden;
        }

        .thunderstorm::before {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: calc(100% + 200px);
          height: calc(100% + 200px);
          background: 
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.9) 49%, rgba(255,255,255,0.9) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.8) 49%, rgba(255,255,255,0.8) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(255,255,255,0.7) 49%, rgba(255,255,255,0.7) 50%, transparent 51%);
          background-size: 20px 80px, 25px 100px, 30px 120px;
          background-position: 0 0, 10px 0, 20px 0;
          animation: heavyRainDrop 0.2s linear infinite;
        }

        .thunderstorm::after {
          content: '';
          position: absolute;
          top: -100px;
          left: -100px;
          width: calc(100% + 200px);
          height: calc(100% + 200px);
          background: 
            linear-gradient(110deg, transparent 48%, rgba(200,220,255,0.9) 49%, rgba(200,220,255,0.9) 50%, transparent 51%),
            linear-gradient(110deg, transparent 48%, rgba(200,220,255,0.8) 49%, rgba(200,220,255,0.8) 50%, transparent 51%);
          background-size: 15px 60px, 35px 140px;
          background-position: 5px 0, 40px 0;
          animation: heavyRainDrop 0.15s linear infinite;
        }

        @keyframes heavyRainDrop {
          0% { transform: translateY(-100px) translateX(60px); }
          100% { transform: translateY(100vh) translateX(-60px); }
        }

        /* Lightning Effect for Thunderstorm */
        .thunderstorm {
          position: relative;
          animation: lightningFlash 4s ease-in-out infinite;
        }

        @keyframes lightningFlash {
          0%, 89%, 91%, 100% { 
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 30%, #1a202c 100%);
            box-shadow: none;
          }
          90%, 90.5% { 
            background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 30%, #e2e8f0 100%);
            box-shadow: 
              inset 0 0 100px rgba(255, 255, 255, 0.8),
              0 0 200px rgba(255, 255, 255, 0.5);
          }
        }

        /* Snow */
        .snow {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 50%, #a0aec0 100%);
        }

        .snow::before {
          content: '';
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: calc(100% + 50px);
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(255, 255, 255, 0.9) 2px, transparent 2px),
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.7) 3px, transparent 3px),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 90%, rgba(255, 255, 255, 0.8) 2px, transparent 2px);
          background-size: 100px 100px, 150px 150px, 200px 200px, 120px 120px, 80px 80px;
          animation: snowFall 8s linear infinite, snowFall2 12s linear infinite;
        }

        .snow::after {
          content: '';
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: calc(100% + 50px);
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.5) 2px, transparent 2px),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 60% 60%, rgba(255, 255, 255, 0.6) 2.5px, transparent 2.5px),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
          background-size: 180px 180px, 250px 250px, 140px 140px, 300px 300px;
          animation: snowFall2 15s linear infinite, snowFall 10s linear infinite;
        }

        @keyframes snowFall {
          0% { transform: translateY(-100px) translateX(0px); }
          100% { transform: translateY(100vh) translateX(50px); }
        }

        @keyframes snowFall2 {
          0% { transform: translateY(-100px) translateX(50px); }
          100% { transform: translateY(100vh) translateX(-30px); }
        }

        /* Fog */
        .fog {
          background: linear-gradient(135deg, #95a5a6 0%, #ecf0f1 50%, #bdc3c7 100%);
        }

        .fog::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 200px 100%;
          animation: fogMove 15s ease-in-out infinite;
        }

        @keyframes fogMove {
          0%, 100% { transform: translateX(-100px); }
          50% { transform: translateX(100px); }
        }

        /* Weather Info Panel */
        .weather-info {
          position: absolute;
          top: 50px;
          left: 50px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 30px;
          color: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 10;
        }

        .temperature {
          font-size: 4rem;
          font-weight: 300;
          margin: 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .condition {
          font-size: 1.5rem;
          margin: 10px 0;
          opacity: 0.9;
        }

        .weather-details {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          font-size: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Demo Controls */
        .demo-controls {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 15px;
          color: white;
          text-align: center;
          z-index: 10;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Weather Info Panel */}
      <div className="weather-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {renderWeatherIcon()}
          <div>
            <h1 className="temperature">{weatherData.temp}°</h1>
            <p className="condition">{weatherData.condition}</p>
          </div>
        </div>
        
        <div className="weather-details">
          <div className="detail-item">
            <Wind className="w-5 h-5" />
            <span>{weatherData.windSpeed} km/h</span>
          </div>
          <div className="detail-item">
            <Thermometer className="w-5 h-5" />
            <span>Feels like {weatherData.temp + 2}°</span>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="demo-controls">
        <p>🌤️ Weather effects demo - Changes automatically every 5 seconds</p>
        <p>Current: <strong>{weatherData.condition}</strong></p>
      </div>
    </div>
  );
};

export default WeatherBackgroundEffects;