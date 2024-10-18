import axiosInstance from "../../api/axiosInstance";

export const profileApi = async () => {
  const response = await axiosInstance.get("/user/profile");
  return response.data; // Return the full response data
};

export const mentorProfileApi = async () => {
  const response = await axiosInstance.get("/mentor/profile");
  return response.data; // Return the full response data
};

export const profileApiPost = async (formData) => {
  const response = await axiosInstance.post("/user/profile", formData);
  return response.data; // Return the full response data
};

export const profileEducationApi = async (formData) => {
  const response = await axiosInstance.post("/user/education", formData);
  return response.data;
};

export const updateEducationApi = async (formData) => {
  const response = await axiosInstance.put("/user/education", formData);
  return response.data;
};

export const deleteEducationApi = async (formData) => {
  const response = await axiosInstance.delete("/user/education", {
    data: formData,
  });
  return response.data;
};
export const profileLocationApi = async (formData) => {
  const response = await axiosInstance.post("/user/location", formData);
  return response.data;
};

export const profileEmploymentApi = async (formData) => {
  const response = await axiosInstance.post(
    "/user/employment-history",
    formData
  );
  return response.data;
};
export const updateEmploymentApi = async (formData) => {
  const response = await axiosInstance.put(
    "/user/employment-history",
    formData
  );
  return response.data;
};
export const profileDocumentApi = async (formData) => {
  const response = await axiosInstance.post("/user/documents", formData);
  return response.data;
};

export const profileCertificateApi = async (formData) => {
  const response = await axiosInstance.post("/user/certificate", formData);
  return response.data;
};
export const updateCertificateApi = async (formData) => {
  const response = await axiosInstance.put("/user/certificate", formData);
  return response.data;
};

export const deleteCertificateApi = async (formData) => {
  const response = await axiosInstance.delete("/user/certificate", {
    data: formData,
  });
  return response.data;
};

export const deleteEmploymentHisApi = async (formData) => {
  const response = await axiosInstance.delete("/user/employment-history", {
    data: formData,
  });
  return response.data;
};

// service api

export const createMentorServiceApi = async (formData) => {
  const response = await axiosInstance.post("/mentor/service", formData);
  return response.data;
};
export const updateMentorServiceApi = async (serviceId, formData) => {
  const response = await axiosInstance.put("/mentor/service", formData, {
    params: {
      serviceId,
    },
  });
  return response.data;
};

export const deleteMentorServiceApi = async (serviceId) => {
  const response = await axiosInstance.delete("/mentor/service", {
    params: {
      serviceId: serviceId,
    },
  });
  return response.data;
};

export const updateOtherInfoMentorApi = async (formData) => {
  const response = await axiosInstance.post("/mentor/profile", formData);
  return response.data;
};

export const uploadMentorVideoApi = async (formData) => {
  const response = await axiosInstance.post("/mentor/upload-video", formData);
  return response.data;
};
export const uploadRecruiterVideoApi = async (formData) => {
  const response = await axiosInstance.post(
    "/recruiter/upload-video",
    formData
  );
  return response.data;
};
