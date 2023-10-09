import { useEffect } from "react";
import "./App.css";
import Login from "../components/Login/Login";
import { AuthStatus, useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  const { status, authenticate } = useAuth();

  useEffect(() => {
    authenticate();
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
      <Sidebar className="sidebar" />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
