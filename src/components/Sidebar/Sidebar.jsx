import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const { logout, account } = useAuth();

  return (
    <nav className="h-screen p-4" id="sidebar">
      {account && account.role === 1 && (
        <button className="title text-white m-5">Administration</button>
      )}

      {account && account.role === 1 && (
        <Link className="btn" to={"/admin-city"}>
          Gestion villes
        </Link>
      )}
      {account && account.role === 1 && (
        <Link className="btn" to={"/admin-center"}>
          Gestion centres
        </Link>
      )}
      {account && account.role === 1 && (
        <Link className="btn" to={"/admin-employee"}>
          Gestion formateurs
        </Link>
      )}
      {account && account.role === 1 && (
        <Link className="btn" to={"/admin-user"}>
          Gestion utilisateurs
        </Link>
      )}

      <button className="title text-white m-5">Menu</button>

      <Link className="btn" to={"/"}>
        Liste des villes
      </Link>
      <Link className="btn" to={"/center"}>
        Liste des centres
      </Link>
      <Link className="btn" to={"/employee"}>
        Liste des formateurs
      </Link>
      <button className="logout" onClick={logout}>
        Déconnexion
      </button>
    </nav>
  );
};

export default Sidebar;
