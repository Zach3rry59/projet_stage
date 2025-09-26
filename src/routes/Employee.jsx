import { useParams } from "react-router-dom";
import { useEmployee } from "../hooks/useEmployee";
import ListEmployee from "../components/List/ListEmployee";

const Employee = () => {
  const { employees } = useEmployee();
  const { id } = useParams();

  const employee = employees?.find((employee) => employee.id === parseInt(id));
  const filteredEmployees = [employee];

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

      <button
        onClick={() => window.history.back()}
        className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 focus:outline-none focus:ring focus:border-green-300 mb-2"
      >
        Retour
      </button>

      <ListEmployee employees={filteredEmployees} />
    </div>
  );
};

export default Employee;
