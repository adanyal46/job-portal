import axiosInstance from "../../../api/axiosInstance";

export const fetchJobSeekersApi = async ({
  page,
  pageSize,
  sortOrder,
  search,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getallJS?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMentorsApi = async ({
  page,
  pageSize,
  sortOrder,
  search,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getallMentors?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchStaffApi = async ({ page, pageSize, sortOrder, search }) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getallFS?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMentorProfileApi = async (userId) => {
  try {
    const response = await axiosInstance.get("/admin/mentorProfile/" + userId);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMentorReviewApi = async (type, userId, page) => {
  try {
    const response = await axiosInstance.get(
      "/admin/getMentorReviews/" + userId + "?=" + type + "&page=" + page
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmployerApi = async ({
  page,
  pageSize,
  sortOrder,
  search,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getAllEmployers?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRecruiterApi = async ({
  page,
  pageSize,
  sortOrder,
  search,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getallRec?page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRecruiterProfileApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/admin/recProfile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchHireRecruiterApi = async ({ page, pageSize, search }) => {
  try {
    const response = await axiosInstance.get(
      `/admin/getRecruiterHiring?page=${page}&pageSize=${pageSize}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProfileApprovalApi = async ({
  role,
  page,
  pageSize,
  search,
}) => {
  try {
    const response = await axiosInstance.get(
      `/admin/mentorApproval/${role}?page=${page}&pageSize=${pageSize}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchPaymentApi = async () => {
  try {
    const response = await axiosInstance.get(`/admin/getPaymentDetails`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchBlogApi = async () => {
  try {
    const response = await axiosInstance.get(`/admin/getBlogs`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
