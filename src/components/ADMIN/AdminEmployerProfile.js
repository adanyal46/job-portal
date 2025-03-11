import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Flex,
  Form,
  message,
  Row,
  Space,
  Typography,
} from "antd";
import {
  LinkEmployerProfileIcon,
  UserEmployerProfileIcon,
} from "../../assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { updateOtherInfo } from "../../features/profile/profileSlice";
import { updatePointOfContact } from "../../features/profile/profileApi";
import Location from "../location";

const TEXT_COLOR = "#4B465C";

const TEXT_STYLE = {
  color: TEXT_COLOR,
};

const DIVIDER_STYLE = {
  borderColor: "#B5B5B5",
  height: "1.4em",
};

const AdminEmployerProfile = () => {
  let [form] = Form.useForm();
  let [pForm] = Form.useForm();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPModal, setShowPModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const locationData = user?.Location?.[0];
  const profileData = user?.Profile?.[0];

  useEffect(() => {
    if (user && user.EmployerPointOfContact) {
      pForm.setFieldsValue({
        email: user.email || user?.EmployerPointOfContact?.[0]?.name,
        fullname: user.EmployerPointOfContact?.[0]?.name,
        phnumber: user.EmployerPointOfContact?.[0]?.contactNumber,
        jobRole: user.EmployerPointOfContact?.[0]?.jobRole,
      });
    }
  }, [user]);

  const handleOk = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    const formData = new FormData();
    formData.append("fullname", values.fullname || "");
    formData.append("email", values.email || "");
    formData.append("phnumber", parseInt(values?.phnumber) || "");
    formData.append("companyName", values.companyName || "");
    formData.append("companySize", values.companySize || "");
    formData.append("companyLink", values.companyLink || "");
    if (imgFile && imgFile instanceof File) {
      formData.append("profilePic", imgFile);
    }

    try {
      setLoading(true);
      const resultAction = await dispatch(updateOtherInfo(formData)).unwrap();
      if (resultAction.success) {
        message.open({
          type: "success",
          content: "Profile updated successfully!",
        });
        setTimeout(() => {
          window.location.replace("/employer/profile");
        }, 500);
        handleCloseInfoModal();
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  const handleOkP = async () => {
    const values = pForm.getFieldsValue();
    const formData = new FormData();
    formData.append("name", values.fullname || "");
    formData.append("email", values.email || "");
    formData.append("contactNumber", parseInt(values?.phnumber) || "");
    formData.append("jobRole", values.jobRole || "");
    if (imgFile && imgFile instanceof File) {
      formData.append("profilePic", imgFile);
    }

    try {
      setLoading(true);
      const resultAction = await updatePointOfContact(formData);
      console.log(resultAction);

      if (resultAction.success) {
        message.open({
          type: "success",
          content: "Point of contact update successfully!",
        });
        setTimeout(() => {
          window.location.replace("/employer/profile");
        }, 500);
        handleClosePModal();
      }
    } catch (error) {
      message.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };
  const handleShowInfoModal = () => {
    form.setFieldValue("fullname", profileData?.fullname);
    form.setFieldValue("phnumber", parseInt(profileData?.phnumber));
    form.setFieldValue("email", user?.email);
    form.setFieldValue("companyName", profileData?.companyName);
    form.setFieldValue("companySize", profileData?.companySize);
    form.setFieldValue("companyLink", profileData?.companyLink);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };
  const handleClosePModal = () => {
    setShowPModal(false);
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: "900px", width: "100%" }}>
      <Typography.Title level={3} style={{ fontWeight: "400" }}>
        Employer Profile
      </Typography.Title>
      <Card style={{ width: "100%" }}>
        <Row gutter={16}>
          {/* Left Side Image */}
          <Col>
            <img
              src={
                profileData?.avatarId
                  ? process.env.REACT_APP_MEDIA_URL + profileData?.avatarId
                  : "/images/no-image.jpg"
              }
              alt="Company Logo"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </Col>
          {/* Right Side Content */}
          <Col flex="auto">
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Row justify="space-between" align="middle">
                <Typography.Title level={2} style={{ margin: 0 }}>
                  {profileData?.companyName ?? "-"}
                </Typography.Title>
              </Row>
              <Typography.Text style={TEXT_STYLE}>
                Company Size: {profileData?.companySize ?? "-"}
              </Typography.Text>
              <Typography.Text style={TEXT_STYLE}>
                Email: {user?.email ?? "-"}
              </Typography.Text>
              <Typography.Text style={TEXT_STYLE}>
                Phone: {profileData?.phnumber ?? "-"}
              </Typography.Text>
              <Flex gap={3} align="center">
                <Typography.Text style={TEXT_STYLE}>
                  Skype: {profileData?.companyLink ?? "N/A"}
                </Typography.Text>
                {profileData?.companyLink && (
                  <Link
                    to={profileData.companyLink}
                    target="_blank"
                    style={{ marginTop: "7px" }}
                  >
                    <LinkEmployerProfileIcon />
                  </Link>
                )}
              </Flex>

              <Typography.Text
                style={{
                  backgroundColor: "#E2F3F9",
                  padding: "4px",
                  color: "#0077A6",
                }}
                strong
              >
                ID: #{profileData?.id}
              </Typography.Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ ...DIVIDER_STYLE, marginBottom: "5px" }} />
        <Location
          location={locationData}
          TEXT_STYLE={TEXT_STYLE}
          setShowLocationModal={setShowLocationModal}
          showLocationModal={showLocationModal}
          btnShow={false}
        />

        <Typography.Title
          level={3}
          style={{ color: "#333333", marginTop: "20px" }}
        >
          Point of Contact
        </Typography.Title>

        <Flex gap={7} className="w-100" style={{ marginBottom: "20px" }}>
          <UserEmployerProfileIcon />
          <Flex justify="space-between" className="w-100">
            <Flex gap={2} vertical>
              <Typography.Text style={TEXT_STYLE}>
                {user?.EmployerPointOfContact?.[0]?.name ?? "N/A"}
              </Typography.Text>
              <Typography.Text style={TEXT_STYLE}>
                {user?.EmployerPointOfContact?.[0]?.jobRole ?? "N/A"}
              </Typography.Text>
              <Typography.Text style={TEXT_STYLE}>
                {user?.Profile?.[0]?.phnumber
                  ? `${user.Profile[0].phnumber}`
                  : "N/A"}
              </Typography.Text>
              <Typography.Text style={TEXT_STYLE}>
                {user?.email ?? "N/A"}
              </Typography.Text>
            </Flex>
            {/* <MenuEmployerProfileIcon /> */}
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default AdminEmployerProfile;
