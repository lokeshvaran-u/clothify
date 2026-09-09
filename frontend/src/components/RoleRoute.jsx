import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

function RoleRoute({ children, allowedRole }) {

  const userRole = getUserRole();

  if (userRole !== allowedRole) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return children;
}

export default RoleRoute;