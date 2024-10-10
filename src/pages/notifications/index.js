import { useEffect, useState } from "react";

import CustomButton from "../../components/customButton";
import CommonModal from "../../components/commonModal";
import CommonInput from "../../components/commonInput";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationList } from "../../features/notification/notificationSlice";
import { getDaysAgo } from "../../utils";
import Loader from "../../components/Loader";
import { Typography } from "antd";

const NotificationEmptyScreen = () => (
  <section className="empty-notifications-container">
    <figure className="no-notification-container">
      <img loading="lazy" src="/images/empty-notifications.png" className="no-notification-image" alt="NoNotifications" />
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
          <CustomButton category="primary" name="Write a Review" handleClick={handleShowReviewModal} />
        </section>
      )}

      <p className="time-span">{getDaysAgo(createdAt)}</p>
    </section>
  );
};

const Notifications = ({ user }) => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const profile = user?.Profile[0];

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
    <section>
      <Typography.Title level={3}>Notifications</Typography.Title>

      {notifications.length < 0 || notifications.length === 0 ? (
        <NotificationEmptyScreen />
      ) : (
        <section className="notifications-cards-wrapper">
          {notifications?.map((notificationData, index) => (
            <NotificationCard notificationData={notificationData} handleShowReviewModal={handleShowReviewModal} key={index} />
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
            <CustomButton key="cancelButton" category="plain" name="Cancel" handleClick={handleCloseReviewModal} />,
            <CustomButton key="submitReviewButton" category="primary" name="Submit Review" />,
          ]}
        >
          <section className="form-with-avatar-wrapper">
            <figure className="review-avatar-container">
              <img
                loading="lazy"
                style={{ maxHeight: "140px", objectFit: "cover", borderRadius: "100%" }}
                src={profile?.avatarId || "/images/review-write-icon.png"}
                alt="writeReviewIcon"
                className="avatar"
              />

              <figcaption className="avatar-name" style={{ lineHeight: "20px" }}>
                {profile?.fullname || "Guest"}
              </figcaption>
            </figure>

            <section className="basic-info-form-wrapper">
              <h4 className="main-heading">Resume Review</h4>

              <p>4.6</p>

              <section className="field-container">
                <span className="label">Your Comments</span>
                <CommonInput category="textarea" placeholder="Enter Your Comments" />
              </section>
            </section>
          </section>
        </CommonModal>
      )}
    </section>
  );
};

export default Notifications;
