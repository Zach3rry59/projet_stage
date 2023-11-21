import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import AdminCity from "./routes/Admin/AdminCity.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import Center from "./routes/Center.jsx";
import City from "./routes/City.jsx";
import CenterDetails from "./routes/CenterDetails.jsx";
import AllCenter from "./routes/AllCenter.jsx";
import Employee from "./routes/Employee.jsx";
import AdminCenter from "./routes/Admin/AdminCenter.jsx";
import AllEmployee from "./routes/AllEmployee.jsx";
import AdminEmployee from "./routes/Admin/AdminEmployee.jsx";
import AdminUser from "./routes/Admin/AdminUser.jsx";
import RoomDetails from "./routes/RoomDetails.jsx";
import AdminKey from "./routes/Admin/AdminKey.jsx";
import AdminRoom from "./routes/Admin/AdminRoom.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <City />,
      },
      {
        path: "/center",
        element: <AllCenter />,
      },
      {
        path: "/employee/:id",
        element: <Employee />,
      },
      {
        path: "/employee",
        element: <AllEmployee />,
      },
      {
        path: "city/:id",
        element: <Center />,
      },
      {
        path: "/center/:id",
        element: <CenterDetails />,
      },
      {
        path: "/room/:id",
        element: <RoomDetails />,
      },
      {
        path: "/admin-city",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-center",
        element: <PrivateRoute element={AdminCenter} />,
      },
      {
        path: "/admin/center/:id",
        element: <PrivateRoute element={AdminRoom} />,
      },
      {
        path: "/admin/key/:id",
        element: <PrivateRoute element={AdminKey} />,
      },
      {
        path: "/admin-employee",
        element: <PrivateRoute element={AdminEmployee} />,
      },
      {
        path: "/admin-user",
        element: <PrivateRoute element={AdminUser} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
