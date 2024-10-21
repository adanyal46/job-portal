import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../api/axiosInstance";


const getUserRole = () => {
  let USER_ROLE = "JOB_SEEKER";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    USER_ROLE = decodedToken.role || "JOB_SEEKER";
  }
  return USER_ROLE;
};
const getEmailRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER" ? "/recruiter/change-email" : "/setting/js/change-email";
};
const getPasswordRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER" ? "/recruiter/change-password" : "/setting/js/change-password";
};

export const updateEmail = async (formData) => {
  const route = getEmailRoute()
  return await axiosInstance.put(route, formData);
};

export const updatePassword = async (formData) => {
  const route = getPasswordRoute()
  return await axiosInstance.put(route, formData);
};
