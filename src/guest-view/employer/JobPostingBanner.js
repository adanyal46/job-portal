import React from "react";
import CustomButton from "../../components/customButton";

const JobPostingBanner = () => {
  return (
    <div className="job_posting_banner_bg">
      <div className="job_posting_banner_container">
        <h2>Trying to find the best talent for your company?</h2>
        <p>
          Post your open jobs and start receiving applications from top talent.
        </p>
        <CustomButton
          category="primary"
          name="Post a Job"
          style={{
            minWidth: "169px",
            maxWidth: "169px",
            height: "62px",
            marginTop: "36px",
            fontSize: "20px",
            fontWeight: 600,
            fontFamily: "Poppins",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default JobPostingBanner;
