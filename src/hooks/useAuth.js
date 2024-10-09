import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../features/profile/profileSlice';
import { isTokenValid } from '../utils';

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
        console.log(lastRoute)
        if (lastRoute) {
          navigate(lastRoute);
        }
      }
    }
  }, [dispatch, navigate, user, loading]);
};

export default useAuth;
