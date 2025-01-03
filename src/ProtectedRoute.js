import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token, role }) => {
  const decoded = jwtDecode(token);

  if (!token || decoded.role !== role) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
