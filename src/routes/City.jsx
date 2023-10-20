import { useState } from "react";
import { useCities } from "../hooks/useCities";
import { useCenters } from "../hooks/useCenters";
import List from "../components/List/List";

const City = () => {
  const { cities } = useCities();
  const { centers } = useCenters();
  const [searchText, setSearchText] = useState("");

  if (!cities && !centers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

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
        name="search"
        className="border p-2 rounded mb-4"
      />

      <List
        items={filteredCities}
        subItems={centers}
        parentItemIdField={"id_city"}
        childItemRoute={"/center"}
        itemRoute={"city"}
        noItemPlaceholder={"Aucune centre disponible"}
        tableColumnHeaders={{
          name: "Nom du centre",
          cp: "Code Postal",
          adress: "Adresse",
        }}
      />
    </div>
  );
};

export default City;
