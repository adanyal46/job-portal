import React from "react";
import CustomButton from "../../components/customButton";

const Hero = () => {
  return (
    <div className="employer_hero_bg">
      <div className="employer_hero_container">
        <h2>Are you ready for your next challenge?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Senectus sapien vel morbi sit
          phasellus. Lorem ipsum dolor sit amet consectetur. Senectus sapien vel
          morbi sit phasellus.
        </p>
        <CustomButton
          category="primary"
          name="Get Started"
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
  );
};

export default Hero;
