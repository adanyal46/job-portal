import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const AuthApp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useAuth(navigate, token);

  return null;
};

export default AuthApp;
