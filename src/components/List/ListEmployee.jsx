import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ListEmployee = ({ employees, infos }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-2 mb-2 rounded">
      <table className="min-w-full ">
        <thead className="bg-green-200">
          <tr>
            <th className={`p-2`}>Nom</th>
            <th className={`p-2`}>Formation</th>
            <th className={`p-2`}>Téléphone</th>
            <th className={`p-2 hidden md:table-cell`} colSpan={2}>
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className={`border`}>
              <td className={`p-2`}>
                {employee.firstname} {employee.lastname}
              </td>
              <td className={`p-2`}>{employee.formation}</td>
              <td className={`p-2`}>
                <input type="tel" disabled value={employee.phone} />
              </td>
              <td className={`p-2 hidden md:table-cell`}>{employee.email}</td>
              {infos && (
                <td>
                  <span
                    className="hover:text-green-500 cursor-pointer"
                    onClick={() => navigate(`/employee/${employee.id}`)}
                  >
                    <FaInfoCircle />
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
