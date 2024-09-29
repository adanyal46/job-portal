import axiosInstance from "../../api/axiosInstance";

export const getJobList = async (formData) => {
  const response = await axiosInstance.get("/job/post", { params: formData });
  return response.data; // Return the full response data
};

export const applyJobApi = async (formData) => {
  const response = await axiosInstance.get(`/job/save`, formData);
  return response.data;
};
