import axiosInstance from "../../../api/axiosInstance";

export const fetchDashboardCounts = async () => {
  try {
    const response = await axiosInstance.get(`/admin/dashboard`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
