import { useEffect, useState } from "react";
import { useCities } from "../hooks/useCities";
import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import { useNavigate, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import List from "../components/List/List";
const BASE_URL = "http://localhost:3002";

const Center = () => {
  const { cities, loading: citiesLoading } = useCities();
  const { centers } = useCenters();
  const { rooms, loading: roomsLoading, fetchRooms } = useRooms();
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const city = cities?.find((city) => city.id === parseInt(id));
  const cityCenters =
    centers?.filter((center) => center.id_city === parseInt(id)) ?? [];

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    if (!roomsLoading && !city) {
      return navigate("/");
    } else {
      fetchRooms(cityCenters);

      socket.on("newRoom", () => {
        fetchRooms(cityCenters);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [roomsLoading, citiesLoading]);

  if (!city && !centers && !rooms) {
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
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {city && `Centre disponible à ${city.name}:`}
        </h2>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Retour
        </button>
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
        parentItemIdField={"center_id"}
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

export default Center;
