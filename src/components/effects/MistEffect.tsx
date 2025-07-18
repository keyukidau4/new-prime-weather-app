import React from "react";

const MistEffect: React.FC = () => (
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

export default MistEffect;