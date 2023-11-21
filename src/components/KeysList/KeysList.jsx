import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { useEmployee } from "../../hooks/useEmployee";

const KeysList = ({ keys }) => {
  const { employees } = useEmployee();

  if (!keys || keys.length === 0) {
    return <div>Aucune clé disponible</div>;
  }

  const sortedKeys = keys.sort((a, b) => (a.id_employee ? -1 : 1));

  return (
    <div className="mb-3">
      <h2>Clé Disponible :</h2>
      <div className="flex items-center space-x-2">
        {sortedKeys.map((key) => {
          const employee = employees?.find(
            (employee) => employee && employee.id === parseInt(key.id_employee)
          );
          return key.id_employee ? (
            <Link to={`/employee/${key.id_employee}`} key={key.id}>
              <div
                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-300 ease-in-out"
                title={`${employee.firstname} ${employee.lastname}`}
              >
                <FaKey />
              </div>
            </Link>
          ) : (
            <div
              key={key.id}
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition duration-300 ease-in-out"
              title="Clé libre"
            >
              <FaKey />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeysList;
