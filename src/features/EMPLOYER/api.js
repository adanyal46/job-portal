import axiosInstance from "../../api/axiosInstance";

export const fetchStaffMemberApi = async () => {
  try {
    const response = await axiosInstance.get(`/employer/getAllstaffmembers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
