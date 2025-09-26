import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import { LocationCity } from "@mui/icons-material";
import { ExitToApp } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
import { SupervisedUserCircle } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { LocationOn } from "@mui/icons-material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const SidebarNav = () => {
  const { logout, account } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth <= 768
  );

  let title = "Utilisateur";
  if (account.role === 1) {
    title = "Administrateur";
  }

  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleWindowResize = () => {
    setIsSidebarCollapsed(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Sidebar collapsed={isSidebarCollapsed} style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={handleSidebarToggle}
          style={{ textAlign: "center" }}
        >
          <h2>{title}</h2>
        </MenuItem>
      </Menu>
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: ({ active }) => {
            return {
              margin: "1px",
              borderRadius: "8px",
              backgroundColor: active ? "#22C55E" : undefined,
              color: active ? "white" : undefined,
              "&:hover": {
                backgroundColor: "#22C55E",
                color: "white",
                borderRadius: "8px",
              },
            };
          },
        }}
      >
        {account && account.role === 1 && (
          <>
            <MenuItem
              icon={<LocationCity />}
              component={<Link to={"/admin-city"} />}
              active={location.pathname === "/admin-city"}
            >
              Gestion villes
            </MenuItem>
            <MenuItem
              icon={<Business />}
              component={<Link to={"/admin-center"} />}
              active={
                location.pathname === "/admin-center" ||
                location.pathname.includes("/admin/center") ||
                location.pathname.includes("/admin/key")
              }
            >
              Gestion centres
            </MenuItem>
            <MenuItem
              icon={<SupervisedUserCircle />}
              component={<Link to={"/admin-employee"} />}
              active={location.pathname === "/admin-employee"}
            >
              Gestion formateurs
            </MenuItem>
            <MenuItem
              icon={<Person />}
              component={<Link to={"/admin-user"} />}
              active={location.pathname === "/admin-user"}
            >
              Gestion utilisateurs
            </MenuItem>
            <div
              style={{
                borderTop: "1px solid #ccc",
                margin: "8px 0",
              }}
            />
          </>
        )}

        <MenuItem
          icon={<HomeOutlinedIcon />}
          component={<Link to="/" />}
          active={
            location.pathname === "/" || location.pathname.includes("/city/")
          }
        >
          Home
        </MenuItem>

        <MenuItem
          icon={<LocationOn />}
          component={<Link to="/center" />}
          active={location.pathname === "/center"}
        >
          Liste des centres
        </MenuItem>
        <MenuItem
          icon={<ContactsOutlinedIcon />}
          component={<Link to="/employee" />}
          active={location.pathname === "/employee"}
        >
          Liste des formateurs
        </MenuItem>
      </Menu>
      <Menu
        iconShape="square"
        menuItemStyles={{
          button: () => {
            return {
              margin: "1px",
              borderRadius: "8px",
              color: "rgb(239 68 68)",
              "&:hover": {
                backgroundColor: "rgb(239 68 68)",
                color: "white",
                borderRadius: "8px",
              },
            };
          },
        }}
      >
        <MenuItem
          icon={<ExitToApp />}
          onClick={() => {
            logout();
          }}
        >
          Déconnexion
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarNav;
