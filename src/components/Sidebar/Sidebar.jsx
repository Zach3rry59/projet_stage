import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <nav className="h-screen p-4" id="sidebar">
      <Link className="btn" to={"/"}>
        Acceuil
      </Link>
      <Link className="btn" to={"/admin"}>
        Menu admin
      </Link>
      <Link className="btn" to={"/menu1"}>
        Menu 1
      </Link>
      <Link className="btn" to={"/menu2"}>
        Menu 2
      </Link>
      <button className="btn" onClick={logout}>
        Se Déconnecter
      </button>
    </nav>
  );
};

export default Sidebar;
