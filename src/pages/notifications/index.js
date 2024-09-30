import { useEffect, useState } from "react";

import CustomButton from "../../components/customButton";
import CommonModal from "../../components/commonModal";
import CommonInput from "../../components/commonInput";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationList } from "../../features/notification/notificationSlice";
import { getDaysAgo } from "../../utils";
import Loader from "../../components/Loader";

const notificationsList = [
  {
    title: "Resume Review with",
    name: "Olivia Roy",
    description:
      "You had a session with Olivia Roy @07:30 PM kindly share your experience with us.",
    action: true,
    time: "An hour ago",
  },
  {
    title: "Interview Prep with",
    name: "Olivia Roy",
    description: "Interview Prep with is scheduled with Olivia Roy @08:30 PM",
    time: "16 hours days ago",
  },
  {
    title: "30-Minute Career Q&A with",
    name: "Olivia Roy",
    description: "30-Minute Career Q&A with Olivia Roy @+09:00 PM",
    time: "2 days ago",
  },
  {
    title: "Job Search Strategy with",
    name: "Olivia Roy",
    description: "Job Search Strategy with Olivia Roy @+05:00 PM",
    time: "20 Mar, 2024",
  },
  {
    title: "Resume+LinkedIn Review with",
    name: "Olivia Roy",
    description:
      "You had a session with Olivia Roy @07:30 PM kindly share your experience with us.",
    time: "An hour ago",
  },
];

const NotificationEmptyScreen = () => (
  <section className="empty-notifications-container">
    <figure className="no-notification-container">
      <img
        loading="lazy"
        src="/images/empty-notifications.png"
        className="no-notification-image"
        alt="NoNotifications"
      />
    </figure>
  </section>
);

const NotificationCard = ({ notificationData, handleShowReviewModal }) => {
  const { title, name, message, createdAt, reviewPending } = notificationData;

  return (
    <section className="notification-container">
      <article className="notification-title">
        <h4 className="title">{title}</h4>
        <h4 className="name">{name}</h4>
      </article>

      <p className="notification-content">{message}</p>

      {reviewPending && (
        <section className="notification-actions">
          <CustomButton
            category="primary"
            name="Write a Review"
            handleClick={handleShowReviewModal}
          />
        </section>
      )}

      <p className="time-span">{getDaysAgo(createdAt)}</p>
    </section>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    dispatch(fetchNotificationList());
  }, [dispatch]);

  const handleShowReviewModal = () => {
    setShowReviewModal(() => true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(() => false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Notifications</h3>

      {notificationsList.length < 0 || notificationsList.length === 0 ? (
        <NotificationEmptyScreen />
      ) : (
        <section className="notifications-cards-wrapper">
          {notifications?.map((notificationData, index) => (
            <NotificationCard
              notificationData={notificationData}
              handleShowReviewModal={handleShowReviewModal}
              key={index}
            />
          ))}
        </section>
      )}

      {showReviewModal && (
        <CommonModal
          title="Write a Review"
          description="Share your thoughts about the mentor and the sessions"
          isModalOpen={showReviewModal}
          handleClose={handleCloseReviewModal}
          footer={[
            <CustomButton
              key="cancelButton"
              category="plain"
              name="Cancel"
              handleClick={handleCloseReviewModal}
            />,
            <CustomButton
              key="submitReviewButton"
              category="primary"
              name="Submit Review"
            />,
          ]}
        >
          <section className="form-with-avatar-wrapper">
            <figure className="review-avatar-container">
              <img
                loading="lazy"
                src="/images/review-write-icon.png"
                alt="writeReviewIcon"
                className="avatar"
              />

              <figcaption className="avatar-name">Olivia Roy</figcaption>
            </figure>

            <section className="basic-info-form-wrapper">
              <h4 className="main-heading">Resume Review</h4>

              <p>4.6</p>

              <section className="field-container">
                <span className="label">Your Comments</span>
                <CommonInput
                  category="textarea"
                  placeholder="Enter Your Comments"
                />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Notifications;
