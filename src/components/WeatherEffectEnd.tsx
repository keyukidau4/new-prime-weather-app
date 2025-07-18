import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Eye, CloudDrizzle, Zap } from 'lucide-react';

const WeatherEffects = () => {
  const [weatherData, setWeatherData] = useState({
    main: 'clear',
    description: 'clear sky',
    temp: 25,
    city: 'Ho Chi Minh City',
    windSpeed: 5
  });

  // Simulate different weather conditions for demo
  const weatherConditions = [
    { main: 'clear', description: 'clear sky', temp: 30, city: 'Ho Chi Minh City', windSpeed: 3 },
    { main: 'rain', description: 'light rain', temp: 22, city: 'Hanoi', windSpeed: 8 },
    { main: 'clouds', description: 'overcast clouds', temp: 18, city: 'Da Lat', windSpeed: 4 },
    { main: 'thunderstorm', description: 'thunderstorm', temp: 24, city: 'Da Nang', windSpeed: 12 },
    { main: 'snow', description: 'light snow', temp: -2, city: 'Sa Pa', windSpeed: 6 },
    { main: 'mist', description: 'mist', temp: 20, city: 'Hue', windSpeed: 2 },
    { main: 'drizzle', description: 'light drizzle', temp: 19, city: 'Can Tho', windSpeed: 5 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      setWeatherData(randomWeather);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (main: string) => {
    const iconStyle = { width: '64px', height: '64px' };
    switch (main) {
      case 'clear': return <Sun style={{...iconStyle, color: '#fde047'}} />;
      case 'rain': return <CloudRain style={{...iconStyle, color: '#93c5fd'}} />;
      case 'clouds': return <Cloud style={{...iconStyle, color: '#d1d5db'}} />;
      case 'thunderstorm': return <Zap style={{...iconStyle, color: '#fde047'}} />;
      case 'snow': return <CloudSnow style={{...iconStyle, color: '#ffffff'}} />;
      case 'mist': return <Eye style={{...iconStyle, color: '#9ca3af'}} />;
      case 'drizzle': return <CloudDrizzle style={{...iconStyle, color: '#bfdbfe'}} />;
      default: return <Sun style={{...iconStyle, color: '#fde047'}} />;
    }
  };

  const getBackgroundClass = (main: string) => {
    switch (main) {
      case 'clear': return 'bg-clear';
      case 'rain': return 'bg-rain';
      case 'clouds': return 'bg-clouds';
      case 'thunderstorm': return 'bg-thunderstorm';
      case 'snow': return 'bg-snow';
      case 'mist': return 'bg-mist';
      case 'drizzle': return 'bg-drizzle';
      default: return 'bg-clear';
    }
  };

  const SunEffect = () => (
    <div className="weather-effect">
      <div className="sun-main"></div>
      <div className="sun-glow"></div>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="sun-ray"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.3}s`
          }}
        ></div>
      ))}
    </div>
  );

  const RainEffect = () => (
    <div className="weather-effect">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${1 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
      <div className="cloud cloud-1"></div>
      <div className="cloud cloud-2"></div>
      <div className="cloud cloud-3"></div>
    </div>
  );

  const CloudEffect = () => (
    <div className="weather-effect">
      <div className="cloud-static cloud-static-1"></div>
      <div className="cloud-static cloud-static-2"></div>
      <div className="cloud-static cloud-static-3"></div>
      <div className="cloud-static cloud-static-4"></div>
    </div>
  );

  const ThunderstormEffect = () => (
    <div className="weather-effect">
      <div className="storm-cloud storm-cloud-1"></div>
      <div className="storm-cloud storm-cloud-2"></div>
      <div className="storm-cloud storm-cloud-3"></div>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="lightning"
          style={{
            left: `${30 + i * 20}%`,
            transform: `rotate(${10 + i * 5}deg)`,
            animationDelay: `${i * 0.5}s`
          }}
        ></div>
      ))}
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="heavy-rain"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random()}s`,
            animationDelay: `${Math.random()}s`
          }}
        ></div>
      ))}
    </div>
  );

  const SnowEffect = () => (
    <div className="weather-effect">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        ></div>
      ))}
      <div className="snow-cloud snow-cloud-1"></div>
      <div className="snow-cloud snow-cloud-2"></div>
    </div>
  );

  const MistEffect = () => (
    <div className="weather-effect">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="mist-layer"
          style={{
            width: `${200 + i * 100}px`,
            left: `${i * 15}%`,
            top: `${100 + i * 80}px`,
            animationDuration: `${8 + i * 2}s`,
            animationDelay: `${i * 1}s`
          }}
        ></div>
      ))}
    </div>
  );

  const DrizzleEffect = () => (
    <div className="weather-effect">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="drizzle-drop"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random()}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}
      <div className="drizzle-cloud drizzle-cloud-1"></div>
      <div className="drizzle-cloud drizzle-cloud-2"></div>
    </div>
  );

  const WindEffect = () => (
    <div className="weather-effect">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="wind-line"
          style={{
            width: `${20 + Math.random() * 40}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${1 + Math.random()}s`,
            animationDelay: `${Math.random()}s`
          }}
        ></div>
      ))}
    </div>
  );

  const renderWeatherEffect = () => {
    switch (weatherData.main) {
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
      case 'drizzle':
        return <DrizzleEffect />;
      default:
        return <SunEffect />;
    }
  };

  return (
    <div className={`weather-container ${getBackgroundClass(weatherData.main)}`}>
      <style>{`
        .weather-container {
          min-height: 100vh;
          position: relative;
          transition: all 1s ease;
          overflow: hidden;
        }

        /* Background gradients */
        .bg-clear {
          background: linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb);
        }
        .bg-rain {
          background: linear-gradient(135deg, #4b5563, #374151, #1f2937);
        }
        .bg-clouds {
          background: linear-gradient(135deg, #9ca3af, #6b7280, #4b5563);
        }
        .bg-thunderstorm {
          background: linear-gradient(135deg, #1f2937, #111827, #000000);
        }
        .bg-snow {
          background: linear-gradient(135deg, #e5e7eb, #d1d5db, #9ca3af);
        }
        .bg-mist {
          background: linear-gradient(135deg, #d1d5db, #9ca3af, #6b7280);
        }
        .bg-drizzle {
          background: linear-gradient(135deg, #6b7280, #4b5563, #374151);
        }

        /* Weather effects base */
        .weather-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        /* Sun effects */
        .sun-main {
          position: absolute;
          top: 80px;
          right: 80px;
          width: 128px;
          height: 128px;
          background: #fde047;
          border-radius: 50%;
          opacity: 0.8;
          animation: pulse 2s infinite;
        }

        .sun-glow {
          position: absolute;
          top: 96px;
          right: 96px;
          width: 96px;
          height: 96px;
          background: #fef3c7;
          border-radius: 50%;
          opacity: 0.6;
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .sun-ray {
          position: absolute;
          top: 120px;
          right: 160px;
          width: 4px;
          height: 32px;
          background: #fde047;
          opacity: 0.7;
          transform-origin: 2px 80px;
          animation: sunRays 3s ease-in-out infinite;
        }

        /* Rain effects */
        .raindrop {
          position: absolute;
          width: 2px;
          height: 32px;
          background: #bfdbfe;
          opacity: 0.6;
          animation: rain infinite linear;
        }

        .cloud {
          position: absolute;
          background: #4b5563;
          border-radius: 50px;
          opacity: 0.8;
        }

        .cloud-1 {
          top: 40px;
          left: 40px;
          width: 96px;
          height: 64px;
          opacity: 0.8;
        }

        .cloud-2 {
          top: 64px;
          left: 80px;
          width: 128px;
          height: 96px;
          background: #374151;
          opacity: 0.7;
        }

        .cloud-3 {
          top: 32px;
          right: 128px;
          width: 112px;
          height: 72px;
          opacity: 0.75;
        }

        /* Static clouds */
        .cloud-static {
          position: absolute;
          background: #9ca3af;
          border-radius: 50px;
          animation: pulse 3s infinite;
        }

        .cloud-static-1 {
          top: 64px;
          left: 64px;
          width: 128px;
          height: 80px;
          opacity: 0.8;
        }

        .cloud-static-2 {
          top: 80px;
          left: 112px;
          width: 160px;
          height: 96px;
          background: #6b7280;
          opacity: 0.7;
        }

        .cloud-static-3 {
          top: 48px;
          right: 80px;
          width: 144px;
          height: 88px;
          opacity: 0.75;
        }

        .cloud-static-4 {
          top: 128px;
          right: 160px;
          width: 112px;
          height: 72px;
          background: #6b7280;
          opacity: 0.65;
        }

        /* Storm effects */
        .storm-cloud {
          position: absolute;
          background: #1f2937;
          border-radius: 50px;
          opacity: 0.9;
        }

        .storm-cloud-1 {
          top: 40px;
          left: 40px;
          width: 128px;
          height: 80px;
        }

        .storm-cloud-2 {
          top: 64px;
          left: 96px;
          width: 160px;
          height: 96px;
          background: #111827;
          opacity: 0.8;
        }

        .storm-cloud-3 {
          top: 48px;
          right: 64px;
          width: 144px;
          height: 88px;
          opacity: 0.85;
        }

        .lightning {
          position: absolute;
          top: 100px;
          width: 4px;
          height: 128px;
          background: #fde047;
          opacity: 0.9;
          animation: lightning 2s ease-in-out infinite;
        }

        .heavy-rain {
          position: absolute;
          width: 2px;
          height: 24px;
          background: #93c5fd;
          opacity: 0.7;
          animation: rain infinite linear;
        }

        /* Snow effects */
        .snowflake {
          position: absolute;
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          opacity: 0.8;
          animation: snow infinite linear;
        }

        .snow-cloud {
          position: absolute;
          background: #d1d5db;
          border-radius: 50px;
          opacity: 0.7;
        }

        .snow-cloud-1 {
          top: 48px;
          left: 48px;
          width: 112px;
          height: 72px;
        }

        .snow-cloud-2 {
          top: 80px;
          left: 96px;
          width: 144px;
          height: 88px;
          background: #9ca3af;
          opacity: 0.6;
        }

        /* Mist effects */
        .mist-layer {
          position: absolute;
          height: 96px;
          background: #9ca3af;
          border-radius: 50px;
          opacity: 0.5;
          animation: mist infinite ease-in-out;
        }

        /* Drizzle effects */
        .drizzle-drop {
          position: absolute;
          width: 2px;
          height: 16px;
          background: #93c5fd;
          opacity: 0.5;
          animation: drizzle infinite linear;
        }

        .drizzle-cloud {
          position: absolute;
          background: #6b7280;
          border-radius: 50px;
          opacity: 0.6;
        }

        .drizzle-cloud-1 {
          top: 32px;
          left: 64px;
          width: 96px;
          height: 64px;
        }

        .drizzle-cloud-2 {
          top: 64px;
          right: 96px;
          width: 128px;
          height: 80px;
          opacity: 0.5;
        }

        /* Wind effects */
        .wind-line {
          position: absolute;
          height: 2px;
          background: #d1d5db;
          opacity: 0.6;
          animation: wind infinite linear;
        }

        /* Weather info container */
        .weather-info {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: white;
          padding: 32px;
          text-align: center;
        }

        .weather-card {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 32px;
          max-width: 384px;
          width: 100%;
        }

        .weather-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .temp {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        .description {
          font-size: 20px;
          margin-bottom: 16px;
          text-transform: capitalize;
        }

        .city {
          font-size: 18px;
          margin-bottom: 8px;
        }

        .wind {
          font-size: 14px;
          opacity: 0.8;
        }

        .demo-info {
          margin-top: 32px;
          text-align: center;
        }

        .demo-text {
          font-size: 14px;
          opacity: 0.7;
        }

        /* Animations */
        @keyframes rain {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        @keyframes snow {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes lightning {
          0%, 90%, 100% { opacity: 0; }
          5%, 85% { opacity: 1; }
        }

        @keyframes mist {
          0%, 100% { transform: translateX(-100px); opacity: 0.3; }
          50% { transform: translateX(100px); opacity: 0.7; }
        }

        @keyframes drizzle {
          0% { transform: translateY(-50vh); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(50vh); opacity: 0; }
        }

        @keyframes wind {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }

        @keyframes sunRays {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>

      {renderWeatherEffect()}
      {weatherData.windSpeed > 10 && <WindEffect />}

      <div className="weather-info">
        <div className="weather-card">
          <div className="weather-icon">
            {getWeatherIcon(weatherData.main)}
          </div>
          
          <div className="temp">{weatherData.temp}°C</div>
          <div className="description">{weatherData.description}</div>
          <div className="city">{weatherData.city}</div>
          <div className="wind">Wind: {weatherData.windSpeed} km/h</div>
        </div>

        <div className="demo-info">
          <div className="demo-text">Weather changes every 5 seconds for demo</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherEffects;