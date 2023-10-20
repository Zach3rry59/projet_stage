import { useEffect, useState } from "react";
import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import { useNavigate, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import List from "../components/List/List";
import { useKeys } from "../hooks/useKeys";
import KeysList from "../components/KeysList/KeysList";
const BASE_URL = "http://localhost:3002";

const CenterDetails = () => {
  const { centers } = useCenters();
  const { rooms, loading: roomsLoading, fetchRooms } = useRooms();
  const { keys, fetchKeys } = useKeys();
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const center = centers?.find(
    (center) => center && center.id === parseInt(id)
  );

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    if (!center && !roomsLoading) {
      return navigate("/");
    } else {
      fetchKeys(center?.id);
      fetchRooms(center?.id);

      socket.on("newRoom", () => {
        fetchRooms([center]);
      });

      socket.on("newKey", () => {
        fetchKeys(center.id);
      });
    }
    return () => {
      socket.disconnect();
    };
  }, [roomsLoading]);

  if (!center) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const filteredRooms = rooms
    ? rooms.filter((room) =>
        room.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {center && `${center.name}`}
        </h2>
        <KeysList keys={keys} />
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
        items={filteredRooms}
        subItems={filteredRooms}
        parentItemIdField={"id"}
        childItemRoute={"/room"}
        itemRoute={"room"}
        noItemPlaceholder={"Aucune détails disponible"}
        tableColumnHeaders={{
          formation_name: "Nom de la formation",
          employee_id: "Formateur",
          date_start: "Début formation",
          date_end: "Fin formation",
        }}
        showRowMobile={2}
      />
    </div>
  );
};

export default CenterDetails;
