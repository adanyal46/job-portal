import { useNavigate } from "react-router-dom";

import LocationWithIcon from "../locationWithIcon";
import CustomButton from "../customButton";
import Rating from "../rating";
import Tag from "../tag";

import "./styles.scss";
import { Typography } from "antd";

const MentorCard = (props) => {
  const { icon, services, profile, certificate, mentorId } = props;
  console.log(profile);

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/job-seeker/mentor/mentorDetail/" + mentorId);
  };

  return (
    <section className="mentor-card-wrapper">
      <figure className="mentor-icon-container">
        <img
          loading="lazy"
          src={profile?.avatarUrl || "/images/mentors/mentor-1.png"}
          alt={profile?.fullname || "Guest"}
          className="mentor-icon"
        />
      </figure>

      <article className="mentor-details-container">
        <Rating rating={0} reviews={0} />

        <h5 className="mentor-name">{profile?.fullname || "Guest"}</h5>

        <LocationWithIcon location={profile?.location} />

        {services ? (
          <article className="mentor-card-tags-container">
            {services.slice(0, 3).map((experty, index) => (
              <Tag key={`mentor-card-tag-${index}`} label={experty.name} />
            ))}
          </article>
        ) : (
          <Typography.Paragraph>No Services Found</Typography.Paragraph>
        )}

        <section className="mentor-detail-button">
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={handleDetailsClick}
          />
        </section>
      </article>
    </section>
  );
};

export default MentorCard;
