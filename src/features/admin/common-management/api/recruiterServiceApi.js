import axiosInstance from "../../../../api/axiosInstance";

// Fetch recruiter services with pagination and optional search query
export const fetchRecruiterServicesApi = async (page, searchQuery = "") => {
  try {
    const response = await axiosInstance.get(
      `/admin/getRecServices?page=${page}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new recruiter service
export const addRecruiterServiceApi = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/addRecService`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing recruiter service
export const updateRecruiterServiceApi = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/updateRecService`, {
      id: id,
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a recruiter service by ID
export const deleteRecruiterServiceApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/deleteRecService`, {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
