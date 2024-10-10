import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../features/profile/profileSlice";
import { isTokenValid } from "../utils";

const useAuth = (navigate) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!loading) {
      if (!token || !isTokenValid(token)) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        if (!user) {
          dispatch(profile());
        }

        // Check if a route exists in local storage
        const lastRoute = localStorage.getItem("lastRoute");

        if (lastRoute) {
          navigate(lastRoute);
        } else {
          if (user?.role === "MENTOR") {
            localStorage.setItem("lastRoute", "/mentor");
          } else {
            localStorage.setItem("lastRoute", "/jobs/search?type=search");
          }
        }
      }
    }
  }, [dispatch, navigate, user, loading]);
};

export default useAuth;
