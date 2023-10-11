import { useState } from "react";
import CityEditModal from "./CityModal/CityModal";
import CityList from "./CityList/CityList";
import { useCities } from "../../../hooks/useCity";

const AdminCity = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cities } = useCities();

  const handleEditClick = (city) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (city) => {
    console.log("supprimer", city.id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  const handleAddCityClick = () => {
    setSelectedCity(null);
    setIsModalOpen(true);
  };

  if (!cities) {
    return <div>Loading</div>;
  }
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Liste des Villes</h1>
      <div className="mb-4">
        <button
          onClick={handleAddCityClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter Ville
        </button>
      </div>
      <CityList
        cities={cities}
        onRemoveClick={handleRemoveClick}
        onEditClick={handleEditClick}
      />
      {isModalOpen && (
        <CityEditModal city={selectedCity} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminCity;
