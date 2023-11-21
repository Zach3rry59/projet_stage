import { useCenters } from "../hooks/useCenters";
import { useRooms } from "../hooks/useRooms";
import { useParams } from "react-router-dom";
import List from "../components/List/List";
import { useKeys } from "../hooks/useKeys";
import KeysList from "../components/KeysList/KeysList";

const CenterDetails = () => {
  const { centers } = useCenters();
  const { rooms } = useRooms();
  const { keys } = useKeys();
  const { id } = useParams();
  const center = centers?.find(
    (center) => center && center.id === parseInt(id)
  );

  const centerRooms =
    rooms?.filter((room) => room.id_center === parseInt(id)) ?? [];

  if (!center) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const safeRooms = centerRooms ? centerRooms : [];

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          {center && `${center.name}`}
        </h2>
        <KeysList keys={keys} />
        <button
          onClick={() => window.history.back()}
          className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-800 focus:outline-none focus:ring focus:border-green-300 mb-2"
        >
          Retour
        </button>
      </div>

      <List
        items={safeRooms}
        subItems={safeRooms}
        parentItemIdField={"id"}
        itemRoute={"room"}
        noItemPlaceholder={"Aucune détails disponible"}
        tableColumnHeaders={{
          formation_name: "Nom de la formation",
          id_employee: "Formateur",
          date_start: "Début formation",
          date_end: "Fin formation",
        }}
        showRowMobile={2}
      />
    </div>
  );
};

export default CenterDetails;
