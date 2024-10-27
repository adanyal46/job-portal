import axiosInstance from "../../api/axiosInstance";

export const getAllJobseekerRecruiterApi = async () => {
  return await axiosInstance.get("/Recruiter/getAllJobseeker");
};
