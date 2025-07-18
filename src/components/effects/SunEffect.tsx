import React from "react";

const SunEffect: React.FC = () => (
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

export default SunEffect;