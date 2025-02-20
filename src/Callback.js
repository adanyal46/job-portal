import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    const mentorId = queryParams.get("state"); // Extract mentor ID

    if (code && mentorId) {
      localStorage.removeItem("calendlyCode");
      localStorage.removeItem("calendly_token");
      localStorage.setItem("calendlyCode", code);
      navigate(`/job-seeker/mentor/mentorDetail/${mentorId}?code=${code}`);
    } else {
      console.error("Missing authorization code or mentor ID.");
    }
  }, [location, navigate]);

  return <p>Processing OAuth...</p>;
};

export default Callback;
