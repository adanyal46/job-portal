import React from "react";
import CustomButton from "../../components/customButton";

const Hero = () => {
  return (
    <div className="partner_hero_bg">
      <div className="partner_hero_container">
        <div className="partner_mentor">
          <h2>Mentors</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
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
