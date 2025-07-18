import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="app-container">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading weather data...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;