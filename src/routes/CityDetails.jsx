import { useEffect, useState } from "react";
import { useCities } from "../hooks/useCities";
import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import { useToggle } from "../hooks/useToggle";
import { useParams } from "react-router-dom";

const City = () => {
  const { cities } = useCities();
  const { centers } = useCenters();
  const { rooms, fetchRooms } = useRooms();
  const { openElements, toggle } = useToggle("rooms");
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const city = cities?.find((city) => city.id === parseInt(id)) ?? {
    name: "pas de ville",
  };
  const cityCenters =
    centers?.filter((center) => center.id_city === parseInt(id)) ?? [];

  useEffect(() => {
    fetchRooms(id);
  }, [id]);
  if (!cities && !cityCenters) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const filteredCenters = cityCenters
    ? cityCenters.filter((center) =>
        center.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {cities && `Centre disponible à ${city.name}:`}
      </h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Rechercher un centre"
        className="border p-2 rounded mb-4"
      />

      <ul>
        {filteredCenters.map((center) => (
          <li key={center.id} className=" bg-white p-4 mb-2 rounded shadow">
            <span
              className="flex justify-between cursor-pointer items-center"
              onClick={(e) => toggle(center.id, e)}
            >
              <span id="link">{center.name}</span>
              {openElements.includes(center.id) ? (
                <span className="text-green-500">&#9660;</span>
              ) : (
                <span className="text-gray-500">&#9654;</span>
              )}
            </span>
            {openElements.includes(center.id) && (
              <div className="mt-2">
                {rooms?.filter((room) => room.center_id === center.id).length >
                0 ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Nom de la salle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rooms
                        .filter((room) => room.center_id === center.id)
                        .map((room) => (
                          <tr key={room.id}>
                            <td>{room.name}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Aucune salle disponible</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default City;
