import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../api/axiosInstance";

const getUserRole = () => {
  let USER_ROLE = "JOB_SEEKER";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    USER_ROLE = decodedToken.role || "JOB_SEEKER";
  } else {
    USER_ROLE = "JOB_SEEKER";
  }
  return USER_ROLE;
};

const getBookingRoute = (filter = "today") => {
  const role = getUserRole();
  return role !== "RECRUITER"
    ? "/mentor/session"
    : "/Recruiter/bookings?filter=" + filter;
};

export const bookSessionApi = async (formData) => {
  const response = await axiosInstance.post(`/user/book-session`, formData);
  return response.data;
};

export const getBookingSessionApi = async (formData) => {
  const response = await axiosInstance.get(`/user/book-session`, formData);
  return response.data;
};

export const upcomingBookingSessionApi = async (filter) => {
  const route = getBookingRoute(filter);
  const response = await axiosInstance.get(route);
  return response.data;
};
