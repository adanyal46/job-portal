import { useState } from "react";

import MentorServiceCollapse from "../../components/mentorServiceCollapse";
import CustomPagination from "../../components/customPagination";
import LocationWithIcon from "../../components/locationWithIcon";
import Certifications from "../../components/certifications";
import CustomButton from "../../components/customButton";
import ScheduleModal from "./components/scheduleModal";
import ReviewCard from "../../components/reviewCard";
import Rating from "../../components/rating";

import {
  BriefcaseIcon,
  MentorBriefcaseIcon,
  MentorTranslateIcon,
  VerifiedIcon,
  InfoIcon,
  PlusIcon,
} from "../../assets/svg";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import MentorVideoContainer from "../../components/MentorVideoContainer";
import { Typography } from "antd";

const MentorDetails = () => {
  const location = useLocation();
  const { services, profile, certificate, mentorId } = location.state || {};
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleShowScheduleModal = () => {
    setShowScheduleModal(() => true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(() => false);
  };

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    handleShowScheduleModal();
  };

  return (
    <section className="mentor-detail-layout-container">
      <Typography.Title level={5}>Mentors / Mentor Details</Typography.Title>
      <section className="mentor-details-page-wrapper">
        <section className="mentor-detail-container" style={{ width: "100%" }}>
          <section className="mentor-card-container">
            <figure className="mentor-card-image-wrapper">
              <img
                loading="lazy"
                src={
                  profile?.avatarUrl || "/images/mentors/mentor-detail-card.png"
                }
                className="mentor-card-image"
                alt="mentor-detail-card-icon"
              />
            </figure>

            <article className="mentor-card-details-container">
              <article className="mentor-card-details">
                <h2 className="mentor-name">{profile?.fullname || "Guest"}</h2>
                <Rating rating={0} reviews={0} />
                <LocationWithIcon location={profile?.location ?? "-"} />
              </article>

              <p className="mentor-expertise">{profile?.tagline ?? "-"}</p>

              <p className="mentor-verified">
                <VerifiedIcon />
                Verified
              </p>
            </article>
          </section>

          <hr className="mentor-detail-divider" />

          <article className="I-can-do-container">
            <p className="i-can-do-item">
              <MentorTranslateIcon /> I can Speak{" "}
              <strong>{profile?.language ?? "-"}</strong> (Conversational)
            </p>

            <p className="i-can-do-item">
              <MentorBriefcaseIcon /> I can help you{" "}
              <strong>
                Interview prep, Resume Review, Job Search Strategy,
              </strong>{" "}
              and more
            </p>
          </article>

          <hr className="mentor-detail-divider" />

          <article className="about-mentor-container">
            <h4 className="section-heading">About</h4>
            <p className="section-content">{profile?.about ?? "-"}</p>
          </article>

          <hr className="mentor-detail-divider" />

          <Certifications certificates={certificate} profile={profile} />

          <hr className="mentor-detail-divider" />

          <article className="about-mentor-container">
            <h4 className="section-heading">Reviews</h4>

            {/* <section className="review-cards-layout">
              <ReviewCard />
              <ReviewCard />
            </section> */}
          </article>

          {/* <CustomPagination /> */}
        </section>

        <section className="mentor-actions-container">
          <MentorVideoContainer mentorvideolink={profile?.mentorvideolink} />
          <section className="mentor-get-started-container">
            <section className="mentor-services-wrapper">
              <h6 className="mentor-services">
                <BriefcaseIcon /> Services
              </h6>

              {/* <CustomButton
                classes="custom-edit-profile-button"
                name={
                  <section className="edit-profile-button-title">
                    Add <PlusIcon />
                  </section>
                }
              /> */}
            </section>

            <p className="info-content">
              <InfoIcon /> Please click on the check boxes to select a service
            </p>

            <MentorServiceCollapse
              handleClick={handleServiceClick}
              services={services}
            />

            {/* <p className="info-content">
              <InfoIcon /> You're on the way!
            </p> */}

            {/* <p className="info-content">
              After placing your order, you'll be taken to the booking page so
              you can schedule time with your mentor
            </p>

            <CustomButton
              category="primary"
              name="Let's Get Started"
              handleClick={handleShowScheduleModal}
            /> */}
          </section>
        </section>
      </section>

      {showScheduleModal && (
        <ScheduleModal
          showScheduleModal={showScheduleModal}
          closeScheduleModal={handleCloseScheduleModal}
          selectedServiceId={selectedServiceId}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          mentorId={mentorId}
          services={services}
          setSelectedServiceId={setSelectedServiceId}
        />
      )}
    </section>
  );
};

export default MentorDetails;
