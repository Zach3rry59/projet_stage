import { useState } from "react";
import CityEdit from "../../components/Admin/City/CityEdit/CityEdit";
import AdminList from "../../components/Admin/AdminList/AdminList";
import { useCities } from "../../hooks/useCities";
import CityAdd from "../../components/Admin/City/CityAdd/CityAdd";
import axios from "axios";

const AdminCity = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cities } = useCities();
  const [searchText, setSearchText] = useState("");

  const handleEditClick = (city) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const filteredCities = cities
    ? cities.filter((city) =>
        city.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleRemoveClick = (city) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la ville : ${city.name}?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/cities/city/${city.id}`);
    }
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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Liste des Villes</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Rechercher ville"
        name="search"
        className="border p-2 rounded mb-4"
      />
      <div className="mb-4">
        <button
          onClick={handleAddCityClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter Ville
        </button>
        {isModalOpen &&
          (selectedCity ? (
            <CityEdit
              cities={cities}
              city={selectedCity}
              onClose={handleModalClose}
            />
          ) : (
            <CityAdd cities={cities} onClose={handleModalClose} />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          items={filteredCities}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default AdminCity;
