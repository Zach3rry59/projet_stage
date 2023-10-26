import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
const Sidebar = () => {
  const { logout, account } = useAuth();
  return (
    <nav className="h-screen p-4" id="sidebar">
      {account && account.role === 1 && (
        <Link className="btn" to={"/admin"}>
          Menu admin
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
