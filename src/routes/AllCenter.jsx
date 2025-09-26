import { useState } from "react";
import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import List from "../components/List/List";
import { useCities } from "../hooks/useCities";

const AllCenter = () => {
  const { cities } = useCities();
  const { centers } = useCenters();
  const { rooms } = useRooms();
  const [searchText, setSearchText] = useState("");

  if (!centers && !rooms) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const centersWithCityName = centers
    ? centers.map((center) => {
        const matchingCity = cities?.find((city) => city.id === center.id_city);
        return {
          ...center,
          name: matchingCity
            ? `${center.name}  (${matchingCity.name})`
            : "Unknown City",
        };
      })
    : [];
  const filteredCenters = centersWithCityName
    ? centersWithCityName.filter((center) =>
        center.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {centers && `Centres disponible :`}
        </h2>
      </div>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Nom du centre"
        name="search"
        className="border p-2 rounded mb-4"
      />

      <List
        items={filteredCenters}
        subItems={rooms}
        parentItemIdField={"id_center"}
        childItemRoute={"/room"}
        itemRoute={"center"}
        noItemPlaceholder={"Aucune salle disponible"}
        tableColumnHeaders={{
          name: "Nom de la salle",
          formation_name: "Nom de la formation",
          date_start: "Début formation",
          date_end: "Fin formation",
        }}
        showRowMobile={2}
      />
    </div>
  );
};

export default AllCenter;
