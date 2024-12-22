import axiosInstance from "../../../../api/axiosInstance";

export const fetchMentorServicesApi = async (page, searchQuery = "") => {
  const response = await axiosInstance.get(
    `/admin/getMentorServices?page=${page}&search=${searchQuery}`
  );
  return response.data;
};

export const addMentorServiceApi = async (data) => {
  const response = await axiosInstance.post(`/admin/addMentorService`, data);
  return response.data;
};

export const updateMentorServiceApi = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/updateMentorService`, {
      id: id,
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMentorServiceApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/deleteMentorService/`, {
    data: {
      id: id,
    },
  });
  return response.data;
};
