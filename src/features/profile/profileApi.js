import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../api/axiosInstance";

const getUserRole = () => {
  let USER_ROLE = "JOB_SEEKER";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    USER_ROLE = decodedToken.role || "JOB_SEEKER";
  }
  return USER_ROLE;
};
const getEducationApiRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER" ? "/recruiter/education" : "/user/education";
};
const getCertificateApiRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER"
    ? "/recruiter/certificate"
    : "/user/certificate";
};
const getExperienceRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER"
    ? "/recruiter/employment-history"
    : "/user/employment-history";
};
const getLocationRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER"
    ? "/recruiter/location"
    : USER_ROLE === "EMPLOYER"
    ? "/employer/location"
    : "/user/location";
};

const getDocumentRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER" ? "/recruiter/documents" : "/user/documents";
};

const uploadVideoRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER"
    ? "/recruiter/upload-video"
    : "/mentor/upload-video";
};

const updateProfileOtherInfoRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER"
    ? "/recruiter/profile"
    : USER_ROLE === "EMPLOYER"
    ? "/employer/profile"
    : USER_ROLE === "MENTOR"
    ? "/mentor/profile"
    : "/user/profile";
};

const getServiceRoute = () => {
  const USER_ROLE = getUserRole();
  return USER_ROLE === "RECRUITER" ? "/recruiter/service" : "/mentor/service";
};

export const profileApi = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data; // Return the full response data
};

export const mentorProfileApi = async () => {
  const response = await axiosInstance.get("/mentor/profile");
  return response.data; // Return the full response data
};
export const recruiterProfileApi = async () => {
  const response = await axiosInstance.get("/recruiter/profile");
  return response.data; // Return the full response data
};

export const employerProfileApi = async () => {
  const response = await axiosInstance.get("/employer/profile");
  return response.data;
};

export const profileApiPost = async (formData) => {
  const response = await axiosInstance.post("/user/profile", formData);
  return response.data; // Return the full response data
};

export const profileEducationApi = async (formData) => {
  const route = getEducationApiRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};

export const updateEducationApi = async (formData) => {
  const route = getEducationApiRoute();
  const response = await axiosInstance.put(route, formData);
  return response.data;
};

export const deleteEducationApi = async (formData) => {
  const route = getEducationApiRoute();
  const response = await axiosInstance.delete(route, {
    data: formData,
  });
  return response.data;
};

export const profileLocationApi = async (formData) => {
  const route = getLocationRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};

export const profileEmploymentApi = async (formData) => {
  const route = getExperienceRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};
export const updateEmploymentApi = async (formData) => {
  const route = getExperienceRoute();
  const response = await axiosInstance.put(route, formData);
  return response.data;
};
export const profileDocumentApi = async (formData) => {
  const route = getDocumentRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};

export const profileCertificateApi = async (formData) => {
  const route = getCertificateApiRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};

export const updateCertificateApi = async (formData) => {
  const route = getCertificateApiRoute();
  const response = await axiosInstance.put(route, formData);
  return response.data;
};

export const deleteCertificateApi = async (formData) => {
  const route = getCertificateApiRoute();
  const response = await axiosInstance.delete(route, {
    data: formData,
  });
  return response.data;
};

export const deleteEmploymentHisApi = async (formData) => {
  const route = getExperienceRoute();
  const response = await axiosInstance.delete(route, {
    data: formData,
  });
  return response.data;
};

// service api

export const createMentorServiceApi = async (formData) => {
  const route = getServiceRoute();
  const USER_ROLE = getUserRole();
  if (USER_ROLE === "RECRUITER") {
    formData.recId = formData.mentorId;
    delete formData.mentorId;
  } else {
    formData.mentorId = formData.mentorId;
  }
  const response = await axiosInstance.post(route, { ...formData });
  return response.data;
};
export const updateMentorServiceApi = async (serviceId, formData) => {
  const route = getServiceRoute();
  const response = await axiosInstance.put(route, formData, {
    params: {
      serviceId,
    },
  });
  return response.data;
};

export const deleteMentorServiceApi = async (serviceId) => {
  const route = getServiceRoute();
  const response = await axiosInstance.delete(route, {
    params: {
      serviceId: serviceId,
    },
  });
  return response.data;
};

export const updateOtherInfoApi = async (formData) => {
  const route = updateProfileOtherInfoRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};
export const uploadMentorVideoApi = async (formData) => {
  const route = uploadVideoRoute();
  const response = await axiosInstance.post(route, formData);
  return response.data;
};
