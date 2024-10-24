import axiosInstance from "../../api/axiosInstance";

export const recruiterRoleApi = async () => {
  const response = await axiosInstance.get("/Recruiter/roles");
  return response.data;
};

export const recruiterProgressRoleApi = async () => {
  const response = await axiosInstance.get("/Recruiter/progress-roles");
  return response.data;
};
export const recruiterTimesheetListApi = async () => {
  const response = await axiosInstance.get("/Recruiter/timesheet");
  return response.data;
};
