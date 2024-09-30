import axiosInstance from "../../api/axiosInstance";

export const getNotificationList = async () => {
  const response = await axiosInstance.get(`/notification`);
  return response.data;
};
