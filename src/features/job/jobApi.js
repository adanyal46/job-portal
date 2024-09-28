import axiosInstance from "../../api/axiosInstance";

// Helper function to convert an object to a query string
const toQueryString = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return queryString ? `?${queryString}` : "";
};

// Function to get job list
export const getJobList = async (formData) => {
  // Create a query string from formData
  const queryString = new URLSearchParams(formData).toString();

  // Make the GET request with query parameters
  const response = await axiosInstance.get(`/job/post?${queryString}`);

  return response.data; // Return the full response data
};
