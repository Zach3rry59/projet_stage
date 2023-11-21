import { useState } from "react";
import CenterAdd from "../../components/Admin/Center/CenterAdd/CenterAdd";
import CenterEdit from "../../components/Admin/Center/CenterEdit/CenterEdit";
import AdminList from "../../components/Admin/AdminList/AdminList";
import { useCenters } from "../../hooks/useCenters";
import axios from "axios";
import { useCities } from "../../hooks/useCities";

const AdminCenter = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { centers } = useCenters();
  const { cities } = useCities();
  const [searchText, setSearchText] = useState("");

  const filteredCenters = centers
    ? centers.filter((center) =>
        center.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleEditClick = (center) => {
    setSelectedCenter(center);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (center) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le centre : ${center.name}?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/centers/center/${center.id}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCenter(null);
  };

  const handleAddCenterClick = () => {
    setSelectedCenter(null);
    setIsModalOpen(true);
  };

  const handleRoomClick = () => {
    setSelectedCenter(null);
    setIsModalOpen(true);
  };

  const handleKeyClick = () => {
    setSelectedCenter(null);
    setIsModalOpen(true);
  };

  if (!centers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Liste des Centres</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Rechercher centre"
        name="search"
        className="border p-2 rounded mb-4"
      />
      <div className="mb-4">
        <button
          onClick={handleAddCenterClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter centre
        </button>
        {isModalOpen &&
          (selectedCenter ? (
            <CenterEdit
              cities={cities}
              center={selectedCenter}
              onClose={handleModalClose}
            />
          ) : (
            <CenterAdd cities={cities} onClose={handleModalClose} />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          cities={cities}
          items={filteredCenters}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
          onAddRoomClick={handleRoomClick}
          onAddKeyClick={handleKeyClick}
        />
      )}
    </div>
  );
};
export default AdminCenter;
