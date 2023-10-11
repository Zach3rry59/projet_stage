import { useState } from "react";
import { useCities } from "../../hooks/useCity";
import { useCenters } from "../../hooks/useCenter";

const City = () => {
  const { cities } = useCities();
  const { centers } = useCenters();

  const [openCities, setOpenCities] = useState([]);
  const [searchText, setSearchText] = useState("");

  if (!cities && !centers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const toggleCity = (cityId) => {
    if (openCities.includes(cityId)) {
      setOpenCities(openCities.filter((id) => id !== cityId));
    } else {
      setOpenCities([...openCities, cityId]);
    }
  };

  const filteredCities = cities
    ? cities.filter((city) =>
        city.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Recherchez une ville:</h2>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Nom de la ville"
        className="border p-2 rounded mb-4"
      />

      <ul>
        {filteredCities.map((city) => (
          <li
            key={city.id}
            onClick={() => toggleCity(city.id)}
            className="cursor-pointer bg-white p-4 mb-2 rounded shadow"
          >
            <span className="flex justify-between items-center">
              {city.name}
              {openCities.includes(city.id) ? (
                <span className="text-green-500">&#9660;</span>
              ) : (
                <span className="text-gray-500">&#9654;</span>
              )}
            </span>
            {openCities.includes(city.id) && (
              <div className="mt-2">
                {centers.filter((center) => center.id_city === city.id).length >
                0 ? (
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th>Nom du Centre</th>
                        <th>Code Postal</th>
                        <th>Adresse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {centers
                        .filter((center) => center.id_city === city.id)
                        .map((center) => (
                          <tr key={center.id}>
                            <td>{center.name}</td>
                            <td>{center.cp}</td>
                            <td>{center.adress}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p>Aucun centre disponible</p>
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
