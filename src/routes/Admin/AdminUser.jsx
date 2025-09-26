import { useEffect, useState } from "react";
import AdminList from "../../components/Admin/AdminList/AdminList";
import axios from "axios";
import socketIOClient from "socket.io-client";
import UserEdit from "../../components/Admin/User/UserEdit/UserEdit";
import UserAdd from "../../components/Admin/User/UserAdd/UserAdd";
const BASE_URL = "http://localhost:3002";

const AdminUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState();

  const fetchUsers = () => {
    axios.get(`${BASE_URL}/users/all`).then((values) => {
      setUsers(values.data);
    });
  };

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    fetchUsers();

    socket.on("newUser", () => {
      fetchUsers();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (user) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'utilisateur : ${user.username} ?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/users/user/${user.id}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleAddUserClick = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  if (!users) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>

      <div className="mb-4">
        <button
          onClick={handleAddUserClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter utilisateur
        </button>
        {isModalOpen &&
          (selectedUser ? (
            <UserEdit user={selectedUser} onClose={handleModalClose} />
          ) : (
            <UserAdd users={users} onClose={handleModalClose} />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          items={users}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default AdminUser;
