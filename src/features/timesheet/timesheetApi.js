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

export const recruiterTimeSheetPostAPi = async (fromData) => {
  const response = await axiosInstance.post("/Recruiter/timesheet", fromData);
  return response.data;
};
export const getRecruiterRoleDetail = async (id) => {
  const response = await axiosInstance.get(
    "/recruiter/getRecruiterAndEmployerDetails?id=" + id
  );
  return response.data;
};
