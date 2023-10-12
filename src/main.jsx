import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Room from "./components/Room/Room.jsx";
import AdminCity from "./components/Admin/City/AdminCity.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import CityAdd from "./components/Admin/City/CityAdd/CityAdd.jsx";
import CityEdit from "./components/Admin/City/CityEdit/CityEdit.jsx";
import Center from "./routes/Center.jsx";
import City from "./routes/City.jsx";
import CenterDetails from "./routes/CenterDetails.jsx";
export const ComponentA = () => {
  return <div>Contenu du Menu 1</div>;
};

export const ComponentB = () => {
  return <div>Contenu du Menu 2</div>;
};

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
        path: "city/:id",
        element: <Center />,
      },
      {
        path: "/menu1",
        element: <ComponentA />,
      },
      {
        path: "/menu2",
        element: <ComponentB />,
      },
      {
        path: "/center/:id",
        element: <CenterDetails />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      },
      {
        path: "/admin",
        element: <PrivateRoute element={AdminCity} />,
      },
      {
        path: "/admin/city",
        element: <PrivateRoute element={CityAdd} />,
      },
      {
        path: "/admin/city/:id",
        element: <PrivateRoute element={CityEdit} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
