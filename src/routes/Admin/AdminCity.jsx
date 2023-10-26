import { useState } from "react";
import CityEdit from "../../components/Admin/City/CityEdit/CityEdit";
import CityList from "../../components/Admin/AdminList/AdminList";
import { useCities } from "../../hooks/useCities";
import CityAdd from "../../components/Admin/City/CityAdd/CityAdd";

const AdminCity = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cities } = useCities();

  const handleEditClick = (city) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (city) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la ville : ${city.name}?`
    );

    if (isConfirmed) {
      console.log("City removed:", city.id);
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
      <div className="mb-4">
        <button
          onClick={handleAddCityClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter Ville
        </button>
        {isModalOpen &&
          (selectedCity ? (
            <CityEdit city={selectedCity} onClose={handleModalClose} />
          ) : (
            <CityAdd onClose={handleModalClose} />
          ))}
      </div>
      <CityList
        items={cities}
        onRemoveClick={handleRemoveClick}
        onEditClick={handleEditClick}
      />
    </div>
  );
};

export default AdminCity;
