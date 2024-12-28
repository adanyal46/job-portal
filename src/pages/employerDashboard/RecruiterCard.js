import { useNavigate } from "react-router-dom";
import LocationWithIcon from "../../components/locationWithIcon";
import CustomButton from "../../components/customButton";
import { Card, Rate, Tag, Typography } from "antd";

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
    <Card>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Left Side Image */}
        <img
          alt="profile"
          src={
            profile?.avatarId
              ? process.env.REACT_APP_MEDIA_URL + profile?.avatarId
              : "/images/no-image.jpg"
          }
          style={{
            width: "140px",
            height: "272px",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        {/* Right Side Content */}
        <div style={{ flex: 1, width: "100%", maxWidth: "300px" }}>
          {/* Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Rate
              allowHalf
              disabled
              defaultValue={profile?.rating ?? 0}
              style={{ fontSize: "16px" }}
            />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {profile?.rating ?? 0}
            </span>
          </div>

          {/* Name */}
          <Typography.Title
            level={4}
            style={{ color: "#2F2C39", fontWeight: "600", fontSize: "22px" }}
          >
            {profile?.fullname || "Guest"}
          </Typography.Title>
          <LocationWithIcon location={profile?.location ?? "N/A"} />
          {/* Tags */}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {profile.services.slice(0, 3).map((experty, index) => (
              <Tag
                key={index}
                style={{
                  borderRadius: "8px",
                  padding: "4px 12px",
                  backgroundColor: "#EFF3F4",
                  color: "#2F2C39",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {experty?.name || experty.service?.name}
              </Tag>
            ))}
          </div>

          {/* Detail Button */}
          <CustomButton
            category="primary"
            name="Details"
            classes="mentor-details-button"
            handleClick={handleDetailsClick}
            block={true}
            style={{ marginTop: "15px" }}
          />
        </div>
      </div>
    </Card>

    // <section
    //   className="mentor-card-wrapper"
    //   style={{
    //     maxHeight: "265px",
    //     height: "100%",
    //   }}
    // >
    //   <figure className="mentor-icon-container">
    //     <img
    //       loading="lazy"
    //       style={{ objectFit: "cover", height: "200px" }}
    //       src={
    //         profile?.avatarId
    //           ? process.env.REACT_APP_MEDIA_URL + profile?.avatarId
    //           : "/images/no-image.jpg"
    //       }
    //       alt={profile?.fullname || "Guest"}
    //       className="mentor-icon"
    //     />
    //   </figure>

    //   <article className="mentor-details-container">
    //     <Rating rating={0} reviews={0} />

    //     <h5 className="mentor-name">{profile?.fullname || "Guest"}</h5>

    //     <LocationWithIcon location={profile?.location} />

    //     {profile.services && (
    //       <article className="mentor-card-tags-container">
    //
    //       </article>
    //     )}

    //     <section className="mentor-detail-button">
    //       <CustomButton
    //         category="primary"
    //         name="Details"
    //         classes="mentor-details-button"
    //         handleClick={handleDetailsClick}
    //         block={true}
    //       />
    //     </section>
    //   </article>
    // </section>
  );
};

export default RecruiterCard;
