import axiosInstance from "../../../api/axiosInstance";

export const fetchMentorBookingApi = async (
  userId,
  page = 1,
  pageSize = 10,
  sortOrder = "desc",
  search = ""
) => {
  try {
    // Constructing the URL with query parameters
    const url = `/admin/getMentorBookings/${userId}?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${encodeURIComponent(
      search
    )}`;

    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployerBookingApi = async (userId) => {
  try {
    // Constructing the URL with query parameters
    const url = `/admin/getEmployerBookings/${userId}`;
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
