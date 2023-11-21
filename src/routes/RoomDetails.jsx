import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import { useCities } from "../hooks/useCities";
import { useParams } from "react-router-dom";
import { IoDesktopOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useEmployee } from "../hooks/useEmployee";

const RoomDetails = () => {
  const { centers } = useCenters();
  const { rooms } = useRooms();
  const { cities } = useCities();
  const { id } = useParams();
  const { employees } = useEmployee();

  const room = rooms?.find((room) => room && room.id === parseInt(id));
  let center;
  let city;
  let date_start;
  let date_end;
  let employee;

  if (room) {
    center = centers?.find((center) => center && center.id === room.id_center);

    date_start = new Date(room.date_start).toLocaleDateString("fr-fr", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    date_end = new Date(room.date_end).toLocaleDateString("fr-fr", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    if (center) {
      city = cities?.find((city) => city && city.id === center.id_city);
    }
    employee = employees?.find(
      (employee) => employee && employee.id === room.id_employee
    );
  }

  if (!room || !city || !center) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {center &&
            room &&
            `${room.name} de ${center.name} de ${city.name} (${city.cp})`}
        </h2>
        <button
          onClick={() => window.history.back()}
          className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 focus:outline-none focus:ring focus:border-green-300 mb-2"
        >
          Retour
        </button>
      </div>
      <div className="flex items-center p-2">
        <IoPersonCircleOutline className="text-blue-500 mr-2" size={32} />
        <span className="text-gray-700">
          Capacité: {room.capacity} personnes
        </span>
        <IoDesktopOutline size={32} color="#007bff" />

        <span className="text-gray-700"> {room.computer} Ordinateurs</span>
      </div>
      <table className="min-w-full text-center">
        <thead className="bg-green-100">
          <tr>
            <th className={`p-2`}>Nom de la formation</th>
            <th className={`p-2 `}>Formateur</th>
            <th className={`p-2 `}>Début formation</th>
            <th className={`p-2 `}>Fin formation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`p-2 `}>{room.formation_name}</td>
            <td className={`p-2`}>
              {employee?.firstname} {employee?.lastname}
            </td>
            <td className={`p-2`}>{date_start}</td>
            <td className={`p-2`}>{date_end}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetails;
