import axiosInstance from "../../api/axiosInstance";

export const getMentorList = async (formData) => {
  const response = await axiosInstance.get(`/mentor/testprofile`, {
    params: formData,
  });
  return response.data;
};
