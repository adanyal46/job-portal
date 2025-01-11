import axiosInstance from "../../api/axiosInstance";

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data; // Return the full response data
};
export const loginAdmin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/adminlogin", credentials);
    return response.data; // Return the full response data
  } catch (error) {
    throw error;
  }
};

export const registerUserApi = async (credentials) => {
  const response = await axiosInstance.post("/auth/signup", credentials);
  return response.data; // Return the full response data
};
