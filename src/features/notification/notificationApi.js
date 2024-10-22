import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../api/axiosInstance";
import { message } from "antd";

const getUserRole = () => {
  let USER_ROLE = "JOB_SEEKER";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    USER_ROLE = decodedToken?.role || "JOB_SEEKER";
  } else {
    message.error("Token Invalid or token not found");
  }
  return USER_ROLE;
};

const getNotificationRoute = () => {
  const role = getUserRole();
  return role === "RECRUITER" ? "/recruiter/notification" : "/notification";
};

export const getNotificationList = async () => {
  const route = getNotificationRoute();
  const response = await axiosInstance.get(route);
  return response.data;
};

export const postReviewNotification = async (formData) => {
  const response = await axiosInstance.post(`/notification/review`, formData);
  return response.data;
};

export const handleApproveNotificationApi = async (formData) => {
  const response = await axiosInstance.post(`/recruiter/job/approve`, formData);
  return response.data;
}
