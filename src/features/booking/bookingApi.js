import axiosInstance from "../../api/axiosInstance";

export const bookSessionApi = async (formData) => {
  const response = await axiosInstance.post(`/user/book-session`, formData);
  return response.data;
};

export const getBookingSessionApi = async (formData) => {
  const response = await axiosInstance.get(`/user/book-session`, formData);
  return response.data;
};
