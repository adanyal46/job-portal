import axiosInstance from "../../api/axiosInstance";

export const getEarningApi = async (startDate, endDate) => {
  const response = await axiosInstance.get(`/mentor/earnings`, {
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};
