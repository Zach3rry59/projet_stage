import { useState } from "react";
import axios from "axios";
import { useField } from "formik";

const AutoCompleteCenter = ({ onSelect }) => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [field, meta, helpers] = useField("city_name");

  const handleChange = async (newAddress) => {
    helpers.setValue(newAddress);
    setAddress(newAddress);
    if (newAddress.length >= 3) {
      try {
        const response = await axios.get(
          `http://localhost:3002/search?q=${newAddress}`
        );

        if (response.data.features.length > 0) {
          const suggestedPlaces = Object.values(response.data.features)
            .filter(
              (place) => place.properties.city && place.properties.postcode
            )
            .map((place) => ({
              name: place.properties.city,
              cp: place.properties.postcode,
            }));

          setSuggestions(suggestedPlaces);
        }
      } catch (error) {
        console.error("Error fetching geocoding data:", error);
      }
    }
  };

  const handleSelect = async (selected) => {
    onSelect(selected);
    setAddress(selected.name);
    setSuggestions("");
    helpers.setTouched(true);
  };

  return (
    <div>
      <input
        {...field}
        type="text"
        value={address}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Rechercher une ville..."
        className="location-search-input"
      />
      <div className="suggestions-container">
        {suggestions
          ? suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name} ( {suggestion.cp} )
              </div>
            ))
          : ""}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default AutoCompleteCenter;
