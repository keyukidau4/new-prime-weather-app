import React from "react";

const ThunderstormEffect: React.FC = () => (
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

export default ThunderstormEffect;