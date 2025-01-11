import { useNavigate } from "react-router-dom";
import Rating from "../../components/rating";
import LocationWithIcon from "../../components/locationWithIcon";
import CustomButton from "../../components/customButton";
import Tag from "../../components/tag";
import { Flex, Typography } from "antd";

const StaffCard = (props) => {
  const { ...profile } = props;
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/employer/staff-member/1");
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
        <img
          loading="lazy"
          src={profile?.avatarId || "/images/user-profile-image.png"}
          alt={profile?.fullname || "Guest"}
          className="mentor-icon"
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      </figure>

      <Flex vertical justify="space-between" flex={1}>
        <Flex vertical gap={8} flex={1}>
          <Typography.Title
            level={4}
            style={{ marginBottom: "0", fontSize: "20px", fontWeight: "600" }}
          >
            {profile.title ?? "N/A Designation"}
          </Typography.Title>
          <Typography.Title
            level={3}
            style={{
              fontWeight: "400",
              marginBottom: 0,
              marginTop: 0,
              fontSize: "24px",
            }}
          >
            {profile?.fullname}
          </Typography.Title>
          <Typography.Text style={{ fontSize: "16px" }}>
            {profile?.email}
          </Typography.Text>
          <Typography.Text style={{ fontSize: "16px" }}>
            {profile?.phnumber ?? "N/A"}
          </Typography.Text>
        </Flex>
        <section className="mentor-detail-button" style={{ marginTop: "50px" }}>
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={handleDetailsClick}
            block={true}
          />
        </section>
      </Flex>
    </section>
  );
};

export default StaffCard;
