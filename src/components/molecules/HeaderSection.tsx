import React from "react";
import CitySelector from "../atoms/CitySelector";
import UnitToggle from "../atoms/UnitToggle";

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface HeaderSectionProps {
  cities: City[];
  selectedCity: City;
  unit: "celsius" | "fahrenheit";
  onCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onUnitToggle: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  cities,
  selectedCity,
  unit,
  onCityChange,
  onUnitToggle,
}) => {
  return (
    <div className="header-section">
      <div className="header-content">
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={onCityChange}
        />
        <UnitToggle unit={unit} onToggle={onUnitToggle} />
      </div>
    </div>
  );
};

export default HeaderSection;