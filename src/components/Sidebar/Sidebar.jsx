import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const { logout, account } = useAuth();
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const toggleAdminLinks = () => {
    setShowAdminLinks(!showAdminLinks);
  };

  return (
    <nav className="h-screen p-4" id="sidebar">
      {account && account.role === 1 && (
        <button className="btn" onClick={toggleAdminLinks}>
          Menu admin
        </button>
      )}

      {account && account.role === 1 && showAdminLinks && (
        <Link className="btn" to={"/admin-city"}>
          Gestion villes
        </Link>
      )}
      {account && account.role === 1 && showAdminLinks && (
        <Link className="btn" to={"/admin-center"}>
          Gestion centres
        </Link>
      )}
      {account && account.role === 1 && showAdminLinks && (
        <Link className="btn" to={"/admin-employee"}>
          Gestion employées
        </Link>
      )}
      {account && account.role === 1 && showAdminLinks && (
        <Link className="btn" to={"/admin-key"}>
          Gestion clés
        </Link>
      )}
      {account && account.role === 1 && showAdminLinks && (
        <Link className="btn" to={"/admin-user"}>
          Gestion utilisateurs
        </Link>
      )}
      <Link className="btn" to={"/"}>
        Liste des villes
      </Link>
      <Link className="btn" to={"/center"}>
        Liste des centres
      </Link>
      <Link className="btn" to={"/employee"}>
        Liste des employées
      </Link>
      <button className="btn" onClick={logout}>
        Se Déconnecter
      </button>
    </nav>
  );
};

export default Sidebar;
