import { useEffect } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useEmployee } from "../hooks/useEmployee";
import ListEmployee from "../components/List/ListEmployee";
const BASE_URL = "http://localhost:3002";

const Employee = () => {
  const { employees, fetchEmployees } = useEmployee();
  const { id } = useParams();

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    fetchEmployees(id);

    socket.on("newEmployee", () => {
      fetchEmployees(id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!employees) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-4">Employée</h2>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Retour
        </button>
      </div>

      <ListEmployee
        items={employees}
        subItems={employees}
        parentItemIdField={"id"}
        itemRoute={"employee"}
        noItemPlaceholder={"Aucune détails disponible"}
        tableColumnHeaders={{
          firstname: "prénom",
          lastname: "nom",
          phone: "téléphone",
          email: "e-mail",
        }}
        showRowMobile={3}
      />
    </div>
  );
};

export default Employee;
