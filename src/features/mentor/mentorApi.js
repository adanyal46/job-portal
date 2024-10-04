import axiosInstance from "../../api/axiosInstance";

export const getMentorList = async (formData) => {
  const response = await axiosInstance.get(`/mentor/profile`, {
    params: formData,
  });
  return response.data;
};
