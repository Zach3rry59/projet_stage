import { useState } from "react";
import AdminList from "../../components/Admin/AdminList/AdminList";
import axios from "axios";
import { useEmployee } from "../../hooks/useEmployee";
import EmployeeEdit from "../../components/Admin/Employee/EmployeeEdit/EmployeeEdit";
import EmployeeAdd from "../../components/Admin/Employee/EmployeeAdd/EmployeeAdd";

const AdminEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { employees } = useEmployee();
  const [searchText, setSearchText] = useState("");

  let filteredEmployees;
  let name;
  filteredEmployees = employees
    ? employees.filter((employee) => {
        name = `${employee.firstname} ${employee.lastname}`;
        return name.toLowerCase().includes(searchText.toLowerCase());
      })
    : [];

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleRemoveClick = (employee) => {
    const isConfirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer le formateur : ${employee.firstname} ${employee.lastname} ?`
    );

    if (isConfirmed) {
      axios.delete(`http://localhost:3002/employees/employee/${employee.id}`);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployeeClick = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  if (!employees) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Liste des formateurs</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Rechercher formateur"
        name="search"
        className="border p-2 rounded mb-4"
      />
      <div className="mb-4">
        <button
          onClick={handleAddEmployeeClick}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Ajouter formateur
        </button>
        {isModalOpen &&
          (selectedEmployee ? (
            <EmployeeEdit
              employee={selectedEmployee}
              onClose={handleModalClose}
            />
          ) : (
            <EmployeeAdd onClose={handleModalClose} />
          ))}
      </div>
      {!isModalOpen && (
        <AdminList
          items={filteredEmployees}
          onRemoveClick={handleRemoveClick}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
};

export default AdminEmployee;
