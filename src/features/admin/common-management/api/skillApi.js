import axiosInstance from "../../../../api/axiosInstance";

// Fetch skills with pagination and optional search query
export const fetchSkillsApi = async (page, searchQuery = "") => {
  try {
    const response = await axiosInstance.get(
      `/admin/getSkills?page=${page}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new skill
export const addSkillApi = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/addSkill`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing skill
export const updateSkillApi = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/updateSkil`, {
      id: id,
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a skill by ID
export const deleteSkillApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/deleteSkill`, {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
