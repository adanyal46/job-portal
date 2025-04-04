import { Upload, Modal, Button, message, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMentorVideo } from "../features/profile/profileSlice";
import noVideoImage from "../assets/no-video.jpg"; // Path to your "No Video" image
import CustomButton from "./customButton";

const MentorVideoContainer = ({ mentorvideolink, canUpload = false }) => {
  const dispatch = useDispatch();
  const { user, videoLoading } = useSelector((state) => state.profile);
  const [videoFile, setVideoFile] = useState(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);

  const fullname = user?.Profile?.[0]?.fullname || "Unknown";

  const handleVideoChange = (info) => {
    if (info.fileList) {
      setVideoFile(info.fileList.at(-1).originFileObj);
    } else {
      setVideoFile(null);
    }
  };

  const handleConfirmUpload = async () => {
    if (!videoFile)
      return message.open({
        type: "error",
        content: "Please upload a video to continue",
      });
    try {
      const formData = new FormData();
      formData.append("mentorVideo", videoFile);
      const response = await dispatch(uploadMentorVideo(formData)).unwrap();
      if (response && response.message && response.profile) {
        setIsUploadModalVisible(false);
        window.location.replace("/mentor/profile");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <article className="mentor-video-container">
      <h4 className="title">{fullname} Introductory Video Clip</h4>
      <p className="description">
        Get to know {fullname} better through her video introduction.
      </p>

      {/* Video Display Area */}
      <div className="video-container">
        {videoFile || mentorvideolink ? (
          <video
            src={videoFile ? URL.createObjectURL(videoFile) : mentorvideolink}
            controls
            className="video"
            style={{ height: "300px", objectFit: "cover" }}
          />
        ) : (
          <img
            src={noVideoImage}
            alt="No Video Available"
            style={{ height: "300px", objectFit: "cover", width: "100%" }}
          />
        )}
      </div>

      {/* Upload Field (Only shown if canUpload is true) */}
      {canUpload && (
        <Upload
          accept="video/*"
          showUploadList={false}
          beforeUpload={() => false} // Prevent auto upload
          onChange={handleVideoChange}
          maxCount={1}
        >
          <Flex style={{ marginTop: "10px" }}>
            <Button type="dashed" block>
              Upload New Video
            </Button>
          </Flex>
        </Upload>
      )}

      {/* Upload Button */}
      {canUpload && videoFile && (
        <Flex justify="end">
          <Button
            type="primary"
            onClick={() => setIsUploadModalVisible(true)}
            className="upload-button"
          >
            Confirm Upload
          </Button>
        </Flex>
      )}

      {/* Modal for video upload confirmation or options */}
      <Modal
        title="Video Upload Options"
        open={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsUploadModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={videoLoading}
            onClick={handleConfirmUpload}
          >
            Confirm Upload
          </Button>,
        ]}
      >
        <p>
          {videoFile
            ? `Are you sure you want to upload ${videoFile.name}?`
            : "No video selected."}
        </p>
      </Modal>
    </article>
  );
};

export default MentorVideoContainer;
