import React from "react";
import CustomButton from "../../components/customButton";

const Hero = () => {
  return (
    <div className="partner_hero_bg">
      <div className="partner_hero_container">
        <div className="partner_mentor">
          <h2>Mentors</h2>
          <p>
            Expand your network, grow your practice, and make a lasting impact
            while reaching new heights in your career.
          </p>
          <CustomButton
            category="primary"
            name="Learn More"
            style={{
              minWidth: "180px",
              maxWidth: "180px",
              height: "62px",
              marginTop: "18px",
              fontSize: "20px",
              fontWeight: 600,
              fontFamily: "Poppins",
              borderRadius: "10px",
            }}
          />
        </div>
        <div className="partner_recruiter">
          <h2>Recruiters</h2>
          <p>
            Unlock exciting opportunities! Connect with employers eager to work
            with industry-focused recruiters like you, who can tap into your
            talent pool—all while enjoying the freedom to set your own schedule.
          </p>
          <CustomButton
            category="primary"
            name="Learn More"
            style={{
              minWidth: "180px",
              maxWidth: "180px",
              height: "62px",
              marginTop: "18px",
              fontSize: "20px",
              fontWeight: 600,
              fontFamily: "Poppins",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
