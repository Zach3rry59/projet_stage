import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import City from "./components/City/City.jsx";
import Center from "./components/Center/Center.jsx";
import Room from "./components/Room/Room.jsx";
import AdminCity from "./components/Admin/City/AdminCity.jsx";

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
        path: "/admin",
        element: <AdminCity />,
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
        path: "/center/:centerId",
        element: <Center />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
