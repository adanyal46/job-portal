import { useEffect, useState } from "react";
import { Card, Flex, Modal, Typography, message as antdMessage } from "antd"; // Import Ant Design Rate and message for notifications
import CustomButton from "../../components/customButton";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  approveNotification,
  fetchNotificationList,
} from "../../features/notification/notificationSlice";
import { getDaysAgo } from "../../utils";
import Loader from "../../components/Loader";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

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

const NotificationCard = ({
  notificationData,
  handleApproveNotify,
  onViewClick,
}) => {
  const { fullname, Datetime, recruiterApprovalStatus } = notificationData;
  const navigate = useNavigate();
  const handleApprove = (data) => {
    Modal.confirm({
      title: `Approve request from ${data?.fullname}?`,
      content: "Are you sure you want to approve this request?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleApproveNotify(data);
      },
      onCancel() {
        antdMessage.info("Approval cancelled.");
      },
    });
  };

  return (
    <section className="notification-container">
      <article className="notification-title">
        <Flex vertical>
          <Typography.Title level={4}>
            You have a job request from {fullname}
          </Typography.Title>

          {recruiterApprovalStatus === "APPROVED" && (
            <Typography.Text style={{ color: "#1bbb62" }} strong>
              You accepted this job
            </Typography.Text>
          )}
          {recruiterApprovalStatus === "PENDING" && (
            <>
              <Typography.Paragraph>
                View it and take action.
              </Typography.Paragraph>
              <Flex gap={"small"} style={{ marginBottom: "10px" }}>
                <CustomButton
                  category="primary"
                  name="Approve"
                  handleClick={() => handleApprove(notificationData)}
                />
                <CustomButton
                  category="danger"
                  name="Decline"
                  classes="custom-button-plain"
                />
                <CustomButton
                  category="plain"
                  name="View"
                  handleClick={() =>
                    navigate(
                      "/recruiter/notification/job-request/" +
                        notificationData.id
                    )
                  }
                />
              </Flex>
              <Typography.Text strong>{getDaysAgo(Datetime)}</Typography.Text>
            </>
          )}
        </Flex>
      </article>
    </section>
  );
};

const RecruiterNotification = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotificationList());
  }, [dispatch]);

  const handleApproveNotify = async (data) => {
    let formData = {
      hiringId: data?.id,
      status: "APPROVED",
    };
    try {
      const response = await dispatch(approveNotification(formData)).unwrap();
      if (response.success) {
        antdMessage.open({
          type: "success",
          content: response.message,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <Typography.Title level={3}>Notifications</Typography.Title>

      {notifications?.length === 0 ? (
        <Card>
          <Flex justify={"center"}>
            <NotificationEmptyScreen />
          </Flex>
        </Card>
      ) : (
        <section className="notifications-cards-wrapper">
          {notifications?.map((notificationData, index) => (
            <NotificationCard
              notificationData={notificationData}
              key={index}
              handleApproveNotify={handleApproveNotify}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default RecruiterNotification;
