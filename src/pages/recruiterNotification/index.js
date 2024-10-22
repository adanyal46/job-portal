import { useEffect, useState } from "react";
import { Card, Flex, Modal, Typography, message as antdMessage } from "antd"; // Import Ant Design Rate and message for notifications
import CustomButton from "../../components/customButton";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { approveNotification, fetchNotificationList } from "../../features/notification/notificationSlice";
import { getDaysAgo } from "../../utils";
import Loader from "../../components/Loader";
import axiosInstance from "../../api/axiosInstance";

const NotificationEmptyScreen = () => (
  <section className="empty-notifications-container">
    <figure className="no-notification-container">
      <img loading="lazy" src="/images/empty-notifications.png" className="no-notification-image" alt="NoNotifications" />
    </figure>
  </section>
);

const NotificationCard = ({ notificationData, handleApproveNotify, onViewClick, loadingJobDetails }) => {
  const { fullname, Datetime, recruiterApprovalStatus } = notificationData;
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
          <Typography.Title level={4}>You have a job request from {fullname}</Typography.Title>

          {recruiterApprovalStatus === "APPROVED" && (
            <Typography.Text style={{ color: "#1bbb62" }} strong>
              You accepted this job
            </Typography.Text>
          )}
          {recruiterApprovalStatus === "PENDING" && (
            <>
              <Typography.Paragraph>View it and take action.</Typography.Paragraph>
              <Flex gap={"small"} style={{ marginBottom: "10px" }}>
                <CustomButton category="primary" name="Approve" handleClick={() => handleApprove(notificationData)} />
                <CustomButton category="danger" name="Decline" classes="custom-button-plain" />
                <CustomButton category="plain" name="View" handleClick={() => onViewClick(notificationData.id)} loading={loadingJobDetails} />
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
  const { notifications, loading } = useSelector((state) => state.notifications);
  const [jobDetails, setJobDetails] = useState(null);
  const [loadingJobDetails, setLoadingJobDetails] = useState(false);

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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobDetails = async (hiringId) => {
    setLoadingJobDetails(true);
    try {
      const response = await axiosInstance.get(`/Recruiter/recruting/details?hiringId=${hiringId}`);
      if (response.data.success) {
        if (response.data.data && response.data.data.length > 0) {
          setJobDetails(response.data.data[0]);
          showJobDetailsModal(response.data.data[0]);
        } else {
          antdMessage.error("No job details found.");
        }
      } else {
        antdMessage.error(response.data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      antdMessage.error("Failed to fetch job details.");
    } finally {
      setLoadingJobDetails(false);
    }
  };

  const showJobDetailsModal = (job) => {
    Modal.info({
      title: (
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          {`Job Details for ${job.serviceName}`}
        </Typography.Title>
      ),
      content: (
        <Card style={{ borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
          <div style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: "10px", marginBottom: "10px" }}>
            <Typography.Paragraph style={{ margin: 0 }}>
              <strong style={{ color: "#4A4A4A" }}>Service Name:</strong>
              <span style={{ marginLeft: "8px", color: "#595959" }}>{job.serviceName}</span>
            </Typography.Paragraph>
          </div>
          <div style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: "10px", marginBottom: "10px" }}>
            <Typography.Paragraph style={{ margin: 0 }}>
              <strong style={{ color: "#4A4A4A" }}>Job Detail:</strong>
              <span style={{ marginLeft: "8px", color: "#595959" }}>{job.jobDetail}</span>
            </Typography.Paragraph>
          </div>
          <div style={{ borderBottom: "1px solid #e8e8e8", paddingBottom: "10px", marginBottom: "10px" }}>
            <Typography.Paragraph style={{ margin: 0 }}>
              <strong style={{ color: "#4A4A4A" }}>Start Date:</strong>
              <span style={{ marginLeft: "8px", color: "#595959" }}>{new Date(job.startDate).toLocaleDateString()}</span>
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Paragraph style={{ margin: 0 }}>
              <strong style={{ color: "#4A4A4A" }}>End Date:</strong>
              <span style={{ marginLeft: "8px", color: "#595959" }}>{new Date(job.endDate).toLocaleDateString()}</span>
            </Typography.Paragraph>
          </div>
        </Card>
      ),
      width: 600, // Adjust modal width as needed
      onOk() {},
    });
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
              key={index}
              handleApproveNotify={handleApproveNotify}
              onViewClick={fetchJobDetails}
              loadingJobDetails={loadingJobDetails}
            />
          ))}
        </section>
      )}
    </section>
  );
};

export default RecruiterNotification;
