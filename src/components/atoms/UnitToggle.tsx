import React from "react";

interface UnitToggleProps {
  unit: "celsius" | "fahrenheit";
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <button onClick={onToggle} className="unit-toggle">
      Switch to °{unit === "celsius" ? "F" : "C"}
    </button>
  );
};

export default UnitToggle;