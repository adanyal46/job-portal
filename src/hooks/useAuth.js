import { useEffect } from "react";
import tokenDecoder from "../utils/jwtDecoder";
import { Roles } from "../utils/roles";

const useAuth = (navigate, token) => {
  useEffect(() => {
    const decodedToken = tokenDecoder(token);

    if (!decodedToken) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      const { role } = decodedToken;
      switch (role) {
        case Roles.MENTOR:
          navigate("/mentor/profile");
          break;
        case Roles.JOB_SEEKER:
          navigate("/job-seeker/job/search");
          break;
        default:
          navigate("/");
      }
    }
  }, [navigate, token]);
};

export default useAuth;
