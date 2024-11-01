import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../api/axiosInstance";
const getUserRole = () => {
  let USER_ROLE = "JOB_SEEKER";
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    USER_ROLE = decodedToken.role || "JOB_SEEKER";
  } else {
    USER_ROLE = "JOB_SEEKER";
  }
  return USER_ROLE;
};

// Determine the earnings route based on the user's role
const getEarningRoute = (
  filter = "today",
  startDate = null,
  endDate = null
) => {
  const role = getUserRole();
  const baseRoute =
    role === "MENTOR" ? "/mentor/earnings" : "/recruiter/earnings";

  // Add startDate and endDate parameters to the URL if they exist
  if (startDate && endDate) {
    return `${baseRoute}?startDate=${startDate}&endDate=${endDate}`;
  }

  // Default route without date range filtering
  return baseRoute;
};

// Fetch earnings data from the API with optional startDate and endDate parameters
export const getEarningApi = async (startDate, endDate) => {
  console.log(startDate, endDate);

  try {
    // `route` will already include startDate and endDate if they are provided
    const route = getEarningRoute("today", startDate, endDate);

    // Do not pass `params` again since they're already in the `route` URL
    const response = await axiosInstance.get(route);

    return response.data;
  } catch (error) {
    console.error("Error fetching earnings:", error);
    throw error;
  }
};
