import { useState } from "react";
import { useEmployee } from "../hooks/useEmployee";
import ListEmployee from "../components/List/ListEmployee";
const AllEmployee = () => {
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

  if (!employees) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Formateurs</h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Nom du formateur"
        name="search"
        className="border p-2 rounded mb-4"
      />

      <ListEmployee employees={filteredEmployees} infos={1} />
    </div>
  );
};

export default AllEmployee;
