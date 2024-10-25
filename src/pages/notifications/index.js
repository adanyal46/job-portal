import { useEffect, useState } from "react";
import { Flex, Rate, Typography, message as antdMessage } from "antd"; // Import Ant Design Rate and message for notifications
import CustomButton from "../../components/customButton";
import CommonModal from "../../components/commonModal";
import CommonInput from "../../components/commonInput";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationList,
  createNotificationReview,
} from "../../features/notification/notificationSlice";
import { getDaysAgo } from "../../utils";
import Loader from "../../components/Loader";

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
  const { title, name, message, createdAt, reviewPending, id } =
    notificationData;

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
            handleClick={() => handleShowReviewModal(id)} // Pass notification ID
          />
        </section>
      )}

      <p className="time-span">{getDaysAgo(createdAt)}</p>
    </section>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, reviewLoading } = useSelector(
    (state) => state.notifications
  );
  const { user } = useSelector((state) => state.profile);
  const profile = user?.Profile[0];

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);
  const [rating, setRating] = useState(0); // Store rating
  const [comment, setComment] = useState(""); // Store comment

  useEffect(() => {
    dispatch(fetchNotificationList());
  }, [dispatch]);

  const handleShowReviewModal = (id) => {
    setCurrentNotificationId(id); // Set notification ID
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setRating(0); // Reset rating
    setComment(""); // Reset comment
  };

  const handleSubmitReview = () => {
    // Handle form submission with rating, notification ID, and comment
    if (!rating || !comment) {
      antdMessage.error("Please provide a rating and comments.");
      return;
    }

    const reviewData = {
      notificationId: currentNotificationId,
      rating,
      message: comment,
    };

    dispatch(createNotificationReview(reviewData))
      .unwrap()
      .then(() => {
        antdMessage.success("Review submitted successfully!");
        handleCloseReviewModal();
      })
      .catch((error) => {
        antdMessage.error(`Failed to submit review: ${error.message}`);
      });
    // Success notification and close modal
    antdMessage.success("Review submitted successfully!");
    handleCloseReviewModal();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <Typography.Title level={3}>Notifications</Typography.Title>

      {notifications.length === 0 ? (
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
              handleClick={handleSubmitReview} // Handle submit
              loading={reviewLoading}
            />,
          ]}
        >
          <section className="form-with-avatar-wrapper">
            <figure className="review-avatar-container">
              <img
                loading="lazy"
                style={{
                  maxHeight: "140px",
                  objectFit: "cover",
                  borderRadius: "100%",
                }}
                src={
                  profile?.avatarId ||
                  profile?.avatarUrl ||
                  "/images/review-write-icon.png"
                }
                alt="writeReviewIcon"
                className="avatar"
              />

              <figcaption
                className="avatar-name"
                style={{ lineHeight: "20px" }}
              >
                {profile?.fullname || "Guest"}
              </figcaption>
            </figure>

            <section className="basic-info-form-wrapper">
              <h4 className="main-heading">Rate Your Experience</h4>
              <Flex gap={"small"}>
                <Rate onChange={setRating} value={rating} />
                <Typography.Text
                  strong
                  type={rating < 2 ? "danger" : "success"}
                >
                  {rating}
                </Typography.Text>
              </Flex>
              {/* Rating component */}
              <section className="field-container">
                <span className="label">Your Comments</span>
                <CommonInput
                  category="textarea"
                  placeholder="Enter Your Comments"
                  value={comment}
                  onChange={(val) => setComment(val)} // Capture comment
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
