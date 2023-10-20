import { useEffect } from "react";
import "./App.css";
import Login from "../components/Login/Login";
import { AuthStatus, useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import { useCenters } from "../hooks/useCenters";
import socketIOClient from "socket.io-client";

function App() {
  const { status, authenticate } = useAuth();
  const { fetchCities } = useCities();
  const { fetchCenters } = useCenters();
  const BASE_URL = "http://localhost:3002";

  useEffect(() => {
    authenticate();
  }, [status]);

  useEffect(() => {
    const socket = socketIOClient(BASE_URL);
    fetchCities();
    fetchCenters();
    socket.on("newCity", () => {
      fetchCities();
    });

    socket.on("newCenter", () => {
      fetchCenters();
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
    <div id="container">
      <div className="hidden md:block">
        <Sidebar className="sidebar" />
      </div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
