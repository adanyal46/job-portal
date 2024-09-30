import { useNavigate } from "react-router-dom";

import LocationWithIcon from "../locationWithIcon";
import CustomButton from "../customButton";
import Rating from "../rating";
import Tag from "../tag";

import "./styles.scss";

const MentorCard = (props) => {
  const {
    icon,
    rating,
    totalReview,
    name,
    location,
    services,
    about,
    languages,
    tagline,
  } = props;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/mentorDetails", {
      state: {
        icon,
        rating,
        totalReview,
        name,
        location,
        services,
        about,
        languages,
        tagline,
      },
    });
  };

  return (
    <section className="mentor-card-wrapper">
      <figure className="mentor-icon-container">
        <img
          loading="lazy"
          src={"/images/mentors/mentor-1.png"}
          alt={name}
          className="mentor-icon"
        />
      </figure>

      <article className="mentor-details-container">
        <Rating rating={rating} reviews={totalReview} />

        <h5 className="mentor-name">{name}</h5>

        <LocationWithIcon location={location} />

        {services && (
          <article className="mentor-card-tags-container">
            {services.map((experty, index) => (
              <Tag key={`mentor-card-tag-${index}`} label={experty.name} />
            ))}
          </article>
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
