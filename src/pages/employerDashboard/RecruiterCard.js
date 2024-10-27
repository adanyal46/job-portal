import { useNavigate } from "react-router-dom";
import Rating from "../../components/rating";
import LocationWithIcon from "../../components/locationWithIcon";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";

const RecruiterCard = (props) => {
  const { ...profile } = props;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(
      "/employer/profile/" +
        (profile.recruiterId ? profile.recruiterId : profile.id)
    );
  };

  return (
    <section
      className="mentor-card-wrapper"
      style={{
        maxHeight: "265px",
        height: "100%",
      }}
    >
      <figure className="mentor-icon-container">
        <img
          loading="lazy"
          style={{ objectFit: "cover", height: "200px" }}
          src={
            profile?.avatarId
              ? process.env.REACT_APP_MEDIA_URL + profile?.avatarId
              : "/images/no-image.jpg"
          }
          alt={profile?.fullname || "Guest"}
          className="mentor-icon"
        />
      </figure>

      <article className="mentor-details-container">
        <Rating rating={0} reviews={0} />

        <h5 className="mentor-name">{profile?.fullname || "Guest"}</h5>

        <LocationWithIcon location={profile?.location} />

        {profile.services && (
          <article className="mentor-card-tags-container">
            {profile.services.slice(0, 3).map((experty, index) => {
              return (
                <Tag
                  key={`mentor-card-tag-${index}`}
                  label={experty?.name || experty.service?.name}
                />
              );
            })}
          </article>
        )}

        <section className="mentor-detail-button">
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={handleDetailsClick}
            block={true}
          />
        </section>
      </article>
    </section>
  );
};

export default RecruiterCard;
