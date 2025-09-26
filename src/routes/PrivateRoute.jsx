import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ element: Element }) => {
  const { account } = useAuth();
  if (!account.role) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default PrivateRoute;
