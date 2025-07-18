import React from "react";

const SnowEffect: React.FC = () => (
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

export default SnowEffect;