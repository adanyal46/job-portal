import { useNavigate } from "react-router-dom";
import Rating from "../../components/rating";
import LocationWithIcon from "../../components/locationWithIcon";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";

const RecruiterCard = (props) => {
  const { ...profile } = props;
  let services;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate('/employer/profile/1')
    // navigate("/job-seeker/mentor/mentorDetail", {
    //   state: {
    //     services,
    //     profile,
    //     certificate,
    //     mentorId,
    //   },
    // });
  };

  return (
    <section className="mentor-card-wrapper">
      <figure className="mentor-icon-container">
        <img loading="lazy" src={profile?.avatarUrl || "/images/mentors/mentor-1.png"} alt={profile?.fullname || "Guest"} className="mentor-icon" />
      </figure>

      <article className="mentor-details-container">
        <Rating rating={0} reviews={0} />

        <h5 className="mentor-name">{profile?.fullname || "Guest"}</h5>

        <LocationWithIcon location={profile?.location} />

        {profile.services && (
          <article className="mentor-card-tags-container">
            {profile.services.slice(0, 3).map((experty, index) => {
              return <Tag key={`mentor-card-tag-${index}`} label={experty} />;
            })}
          </article>
        )}

        <section className="mentor-detail-button">
          <CustomButton category="primary" name="Details" classes="mentor-details-button" handleClick={handleDetailsClick} block={true} />
        </section>
      </article>
    </section>
  );
};

export default RecruiterCard;
