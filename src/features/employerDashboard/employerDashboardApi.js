import axiosInstance from "../../api/axiosInstance";

export const getCountApi = async () => {
  const response = await axiosInstance.get("/employer/counts");
  return response.data;
};

export const createJobApi = async (values) => {
  const response = await axiosInstance.post("/employer/job", values);
  return response.data;
};

export const getJobListApi = async () => {
  const response = await axiosInstance.get("/employer/jobs");
  return response.data;
};
export const getJobDetailApi = async (id) => {
  const response = await axiosInstance.get("/employer/job/" + id);
  return response.data;
};
export const updateJobApi = async (id, formData) => {
  const response = await axiosInstance.patch("/employer/job/" + id, formData);
  return response.data;
};
export const getAppliedJobListApi = async (id) => {
  const response = await axiosInstance.get("/employer/job-applied/" + id);
  return response.data;
};
export const getActivityList = async () => {
  const response = await axiosInstance.get("/employer/activities");
  return response.data;
};

export const getTalentList = async () => {
  const response = await axiosInstance.get("/employer/talents");
  return response.data;
};
export const getTalentDetailApi = async (id) => {
  const response = await axiosInstance.get("/employer/talent/" + id);
  return response.data;
};

export const getRecruiterList = async () => {
  const response = await axiosInstance.get("/employer/recruiters");
  return response.data;
};
export const getHireRecruiterList = async () => {
  const response = await axiosInstance.get("/employer/hired-recruiters");
  return response.data;
};
export const getRecruiterDetailApi = async (id) => {
  const response = await axiosInstance.get("/employer/recruiter/" + id);
  return response.data;
};

export const postHireRecruiterApi = async (formData) => {
  const response = await axiosInstance.post("/employer/hire", formData);
  return response.data;
};
export const getTimesheetListByRecruiter = async (id) => {
  const response = await axiosInstance.get(
    "/employer/recruiter/timesheet/" + id
  );
  return response.data;
};

export const getTimesheetDetailApi = async (id) => {
  const response = await axiosInstance.get(
    "/employer/recruiter/timesheet/detail/" + id
  );
  return response.data;
};
