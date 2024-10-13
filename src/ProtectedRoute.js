import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, token, role }) => {
  const location = useLocation();
  const decoded = jwtDecode(token);

  if (!token || decoded.role !== role) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};

export default ProtectedRoute;
