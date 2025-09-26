import { useEffect } from "react";
import Login from "../components/Login/Login";
import { AuthStatus, useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import { useCenters } from "../hooks/useCenters";
import socketIOClient from "socket.io-client";
import { useEmployee } from "../hooks/useEmployee";
import { useRooms } from "../hooks/useRooms";
import { useKeys } from "../hooks/useKeys";
import SidebarNav from "../components/Sidebar/Sidebar";

function App() {
  const { status, authenticate } = useAuth();
  const { fetchCities } = useCities();
  const { fetchCenters } = useCenters();
  const { fetchEmployees } = useEmployee();
  const { fetchRooms } = useRooms();
  const { fetchKeys } = useKeys();

  const BASE_URL = "http://localhost:3002";

  useEffect(() => {
    authenticate();
  }, [status]);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    fetchRooms();
    fetchCities();
    fetchCenters();
    fetchEmployees();
    fetchKeys();

    socket.on("newRoom", () => {
      fetchRooms();
    });

    socket.on("newKey", () => {
      fetchKeys();
    });

    socket.on("newCity", () => {
      fetchCities();
      fetchCenters();
    });

    socket.on("newCenter", () => {
      fetchCenters();
    });

    socket.on("newEmployee", () => {
      fetchEmployees();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  if (status === AuthStatus.Unknown) {
    return (
      <>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      </>
    );
  }

  if (status === AuthStatus.Guest) {
    return (
      <>
        <Login />
      </>
    );
  }
  return (
    <div id="container" className="bg-gray-100">
      <SidebarNav />

      <Outlet />
    </div>
  );
}

export default App;
