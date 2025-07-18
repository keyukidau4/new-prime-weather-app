import React from "react";

const RainEffect: React.FC = () => (
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
    <div className="rain-cloud rain-cloud-1"></div>
    <div className="rain-cloud rain-cloud-2"></div>
    <div className="rain-cloud rain-cloud-3"></div>
  </div>
);

export default RainEffect;