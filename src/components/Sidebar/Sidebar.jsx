import { useAuth } from "../../hooks/useAuth";
import "./Sidebar.css";
const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <nav className="h-screen p-4" id="sidebar">
      <button>MENU 1</button>
      <button>Menu 2</button>
      <button>Menu 3</button>
      <button>Menu 4</button>
      <button onClick={logout}>Se Déconnecter</button>
    </nav>
  );
};

export default Sidebar;
