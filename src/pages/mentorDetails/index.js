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
} from "../../assets/svg";
import "./styles.scss";

const MentorDetails = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleShowScheduleModal = () => {
    setShowScheduleModal(() => true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(() => false);
  };

  return (
    <section className="main-layout-container">
      <p className="page-main-heading">
        Mentors
        <span className="slash"> / </span>
        <span className="highlighted">Mentors Details</span>
      </p>

      <section className="mentor-details-page-wrapper">
        <section className="mentor-detail-container">
          <section className="mentor-card-container">
            <figure className="mentor-card-image-wrapper">
              <img
                loading="lazy"
                src="/images/mentors/mentor-detail-card.png"
                className="mentor-card-image"
                alt="mentor-detail-card-icon"
              />
            </figure>

            <article className="mentor-card-details-container">
              <article className="mentor-card-details">
                <h2 className="mentor-name">Olivia Roy</h2>
                <Rating rating="4.6" reviews="32" />
                <LocationWithIcon location="US" />
              </article>

              <p className="mentor-expertise">UX Designer at Atos</p>

              <p className="mentor-verified">
                <VerifiedIcon />
                Verified
              </p>
            </article>
          </section>

          <hr className="mentor-detail-divider" />

          <article className="I-can-do-container">
            <p className="i-can-do-item">
              <MentorTranslateIcon /> I can Speak <strong>Spanish</strong>{" "}
              (Conversational)
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
            <p className="section-content">
              The power of design is nothing unless you can turn it into
              influence, this is the reason why I am here. My passion is for
              understanding human behavior, needs, and desires. I leverage a
              human-centered approach to help organizations identify business
              opportunities and design breakthrough products, services, and
              experience solutions. The power of design is nothing unless you
              can turn it into influence, this is the reason why I am here. My
              passion is for understanding human behavior, needs, and desires. I
              leverage a human-centered approach to help organizations identify
              business opportunities and design breakthrough products, services,
              and experience solutions. The power of design is nothing unless
              you can turn it into influence, this is the reason why I am here.
              My passion is for understanding human behavior, needs, and
              desires. I leverage a human-centered approach to help
              organizations identify business opportunities and design
              breakthrough products, services, and experience solutions. The
              power of design is nothing unless you can turn it into influence,
              this is the reason why I am here. My passion is for understanding
              human behavior, needs, and desires.
            </p>
          </article>

          <hr className="mentor-detail-divider" />

          <Certifications />

          <hr className="mentor-detail-divider" />

          <article className="about-mentor-container">
            <h4 className="section-heading">Reviews</h4>

            <section className="review-cards-layout">
              <ReviewCard />
              <ReviewCard />
            </section>
          </article>

          <CustomPagination />
        </section>

        <section className="mentor-actions-container">
          <article className="mentor-video-container">
            <p>Olivia Introductory video clip</p>
            <p>Get to know Olivia in a better way</p>
            <figure>
              <img src="/images/mentors/mentor-1.png" alt="mentor icon" />
            </figure>
          </article>
          <section className="mentor-get-started-container">
            <h6 className="mentor-services">
              <BriefcaseIcon /> Services
            </h6>

            <p className="info-content">
              <InfoIcon /> Please click on the check boxes to select a service
            </p>

            <MentorServiceCollapse handleClick={handleShowScheduleModal} />

            <p className="info-content">
              <InfoIcon /> You're on the way!
            </p>

            <p className="info-content">
              After placing your order, you'll be taken to the booking page so
              you can schedule time with your mentor
            </p>

            <CustomButton
              category="primary"
              name="Let's Get Started"
              handleClick={handleShowScheduleModal}
            />
          </section>
        </section>
      </section>

      {showScheduleModal && (
        <ScheduleModal
          showScheduleModal={showScheduleModal}
          closeScheduleModal={handleCloseScheduleModal}
        />
      )}
    </section>
  );
};

export default MentorDetails;
