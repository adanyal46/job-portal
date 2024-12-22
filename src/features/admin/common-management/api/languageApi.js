import axiosInstance from "../../../../api/axiosInstance";

// Fetch languages with pagination and optional search query
export const fetchLanguagesApi = async (page, searchQuery = "") => {
  try {
    const response = await axiosInstance.get(
      `/admin/getLanguages?page=${page}&search=${searchQuery}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new language
export const addLanguageApi = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/addLanguage`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing language
export const updateLanguageApi = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/admin/updateLanguage`, {
      id: id,
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a language by ID
export const deleteLanguageApi = async (id) => {
  try {
    const response = await axiosInstance.delete(`/admin/deleteLanguage`, {
      data: {
        id: id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
