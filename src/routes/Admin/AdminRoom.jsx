import { useState } from "react";
import axios from "axios";
import { useRooms } from "../../hooks/useRooms";
import { useCenters } from "../../hooks/useCenters";
import { useEmployee } from "../../hooks/useEmployee";
import AdminList from "../../components/Admin/AdminList/AdminList";
import RoomEdit from "../../components/Admin/Room/RoomEdit/RoomEdit";
import RoomAdd from "../../components/Admin/Room/RoomAdd/RoomAdd";
import { useParams } from "react-router-dom";

const AdminRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rooms } = useRooms();
  const { centers } = useCenters();
  const { employees } = useEmployee();
  const { id } = useParams();

  const center = centers?.find(
    (center) => center && center.id === parseInt(id)
  );
  const centerRoom = rooms?.filter(
    (room) => room && room.id_center === parseInt(id)
  );

  const handleEditClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (room) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer la salle : ${room.name}?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/rooms/room/${room.id}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleAddCityClick = () => {
    setSelectedRoom(null);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Liste des Salles de {center?.name}
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
          Ajouter Salle
        </button>
        {isModalOpen &&
          (selectedRoom ? (
            <RoomEdit
              room={selectedRoom}
              id_center={id}
              employees={employees}
              onClose={handleModalClose}
            />
          ) : (
            <RoomAdd
              id_center={id}
              employees={employees}
              onClose={handleModalClose}
            />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          items={centerRoom}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default AdminRoom;
