import axiosInstance from "../../api/axiosInstance";

export const updateEmail = async (formData) => {
  return await axiosInstance.put("/setting/js/change-email", formData);
};

export const updatePassword = async (formData) => {
  return await axiosInstance.put("/setting/js/change-password", formData);
};
