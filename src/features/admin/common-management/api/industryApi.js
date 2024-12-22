import axiosInstance from "../../../../api/axiosInstance";

export const fetchIndustriesApi = async (page, searchQuery = null) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getIndustries?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: { search: searchQuery },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addIndustryApi = async (data) => {
  const response = await axiosInstance.post(`/admin/addIndustry`, data);
  return response.data;
};

export const updateIndustryApi = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/updateIndustry`, {
      id: id,
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIndustryApi = async (id) => {
  const response = await axiosInstance.delete(`/admin/deleteIndustry/`, {
    data: {
      id: id,
    },
  });
  return response.data;
};
