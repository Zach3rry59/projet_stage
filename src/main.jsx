import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import AdminCity from "./routes/Admin/AdminCity.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import CityEdit from "./components/Admin/City/CityEdit/CityEdit.jsx";
import Center from "./routes/Center.jsx";
import City from "./routes/City.jsx";
import CenterDetails from "./routes/CenterDetails.jsx";
import AllCenter from "./routes/AllCenter.jsx";
import Employee from "./routes/Employee.jsx";
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
        element: <Employee />,
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
        path: "/admin-city",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-center",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-room",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-key",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-employee",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin-user",
        element: <PrivateRoute element={AdminCity} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
