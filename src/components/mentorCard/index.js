import { useNavigate } from "react-router-dom";

import LocationWithIcon from "../locationWithIcon";
import CustomButton from "../customButton";
import Rating from "../rating";
import Tag from "../tag";

import "./styles.scss";

const MentorCard = (props) => {
  const { icon, rating, reviews, name, location, expertise } = props;

  const navigate = useNavigate();

  return (
    <section className="mentor-card-wrapper">
      <figure className="mentor-icon-container">
        <img loading="lazy" src={icon} alt={name} className="mentor-icon" />
      </figure>

      <article className="mentor-details-container">
        <Rating rating={rating} reviews={reviews} />

        <h5 className="mentor-name">{name}</h5>

        <LocationWithIcon location={location} />

        {expertise && (
          <article className="mentor-card-tags-container">
            {expertise.map((experty, index) => (
              <Tag key={`mentor-card-tag-${index}`} label={experty} />
            ))}
          </article>
        )}

        <section className="mentor-detail-button">
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={() => navigate("/mentorDetails")}
          />
        </section>
      </article>
    </section>
  );
};

export default MentorCard;
