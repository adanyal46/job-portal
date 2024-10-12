import axiosInstance from "../../api/axiosInstance";

export const getMentorReviews = async () => {
  const response = await axiosInstance.get("/mentor/review");
  return response.data;
};
