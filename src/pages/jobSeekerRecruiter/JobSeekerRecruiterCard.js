import { useNavigate } from "react-router-dom";
import Rating from "../../components/rating";
import LocationWithIcon from "../../components/locationWithIcon";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import { Typography } from "antd";

const JobSeekerRecruiterCard = (props) => {
  const { ...profile } = props;
  const navigate = useNavigate();

  const handleDetailsClick = (user) => {
    navigate("/recruiter/jobseeker/detail/" + user.id);
  };

  return (
    <section className="mentor-card-wrapper">
      <figure className="mentor-icon-container">
        <img
          loading="lazy"
          src={profile?.avatarUrl || "/images/no-image.jpg"}
          alt={profile?.fullname || "Guest"}
          className="mentor-icon"
          style={{ objectFit: "cover" }}
        />
      </figure>

      <article className="mentor-details-container">
        <h5 className="mentor-name">{profile?.fullname || "Guest"}</h5>

        <LocationWithIcon location={profile?.location} />
        <Typography.Text style={{ color: "#0C0C0C", fontSize: "16px" }}>
          {profile.email}
        </Typography.Text>
        <Typography.Text style={{ color: "#0C0C0C", fontSize: "16px" }}>
          {profile.phnumber}
        </Typography.Text>

        <section className="mentor-detail-button">
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={() => handleDetailsClick(profile)}
            block={true}
          />
        </section>
      </article>
    </section>
  );
};

export default JobSeekerRecruiterCard;
