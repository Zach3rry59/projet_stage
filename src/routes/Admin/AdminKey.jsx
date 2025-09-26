import { useState } from "react";
import KeyEdit from "../../components/Admin/Key/KeyEdit/KeyEdit";
import AdminList from "../../components/Admin/AdminList/AdminList";
import { useKeys } from "../../hooks/useKeys";
import KeyAdd from "../../components/Admin/Key/KeyAdd/KeyAdd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployee";
import { useCenters } from "../../hooks/useCenters";

const AdminKey = () => {
  const [selectedKey, setSelectedKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { keys } = useKeys();
  const { centers } = useCenters();
  const { employees } = useEmployee();
  const { id } = useParams();

  const center = centers?.find(
    (center) => center && center.id === parseInt(id)
  );
  const key = keys?.filter((key) => key && key.id_center === parseInt(id));

  const handleEditClick = (key) => {
    setSelectedKey(key);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (key) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la clé : ${key.id}?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/keys/key/${key.id}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedKey(null);
  };

  const handleAddCityClick = () => {
    setSelectedKey(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Liste des Clés du centre : {center?.name}
      </h1>
      <button
        onClick={() => window.history.back()}
        className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 focus:outline-none focus:ring focus:border-green-300 mb-2"
      >
        Retour
      </button>
      <div className="mb-4">
        <button
          onClick={handleAddCityClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter clé
        </button>
        {isModalOpen &&
          (selectedKey ? (
            <KeyEdit
              employees={employees}
              selectedKey={selectedKey}
              id_center={id}
              onClose={handleModalClose}
            />
          ) : (
            <KeyAdd
              employees={employees}
              id_center={id}
              onClose={handleModalClose}
            />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          items={key}
          keys={1}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default AdminKey;
