import React from "react";
import { MapPin } from "lucide-react";

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface CitySelectorProps {
  cities: City[];
  selectedCity: City;
  onCityChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCity,
  onCityChange,
}) => {
  return (
    <div className="city-selector">
      <MapPin className="location-icon" size={24} />
      <select
        value={selectedCity.name}
        onChange={onCityChange}
        className="city-dropdown"
      >
        {cities.map((city) => (
          <option
            key={city.name}
            value={city.name}
            className="city-option"
          >
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;