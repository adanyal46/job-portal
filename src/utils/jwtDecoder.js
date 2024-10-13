import { jwtDecode } from "jwt-decode";

const tokenDecoder = (token) => {
  if (!token || typeof token !== "string") {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    return {
      role: decoded.role,
      userId: decoded.user_id,
    };
  } catch (error) {
    console.error("Token decoding error:", error);
    return null;
  }
};

export default tokenDecoder;
