import { Image } from "antd";
import React from "react";

const About = () => {
  return (
    <div className="about__bg">
      <div className="about__container">
        <div className="about__left">
          <h2>About FuseWW</h2>
          <p>
            sit amet consectetur. Cum viverra fames et tristique eu. Etiam
            nullam lorem pulvinar porttitor. Lorem ipsum dolor sit amet
            consectetur. Cum viverra fames et tristique eu. Etiam nullam lorem
            pulvinar porttitor.{" "}
          </p>
          <hr />
          <ul>
            <li>sit amet consectetur. Cum viverra fames et tristique eu.</li>
            <li>sit amet consectetur. Cum viverra fames et tristique eu.</li>
            <li>sit amet consectetur. Cum viverra fames et tristique eu.</li>
          </ul>
        </div>
        <div className="about__right">
          <Image src="/guest/aboutus-about.png" preview={false} />
        </div>
      </div>
    </div>
  );
};

export default About;
