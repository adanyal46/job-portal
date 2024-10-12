import axiosInstance from "../../api/axiosInstance";

export const getMentorList = async (formData) => {
  const response = await axiosInstance.get(`/getMentorforJs`, {
    params: formData,
  });
  return response.data;
};
