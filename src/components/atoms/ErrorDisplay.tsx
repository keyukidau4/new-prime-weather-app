import React from "react";

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div className="app-container error-bg">
      <div className="error-container">
        <p className="error-text">{error}</p>
        <button onClick={onRetry} className="retry-button">
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;