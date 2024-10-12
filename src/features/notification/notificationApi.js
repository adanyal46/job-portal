import axiosInstance from "../../api/axiosInstance";

export const getNotificationList = async () => {
  const response = await axiosInstance.get(`/notification`);
  return response.data;
};

export const postReviewNotification = async (formData) => {
  const response = await axiosInstance.post(`/notification/review`, formData);
  return response.data;
};
