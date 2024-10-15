import { Upload, Modal, Button, message, Flex } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const MentorVideoContainer = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (info) => {
    if (info.fileList) {
      setVideoFile(info.fileList.at(-1).originFileObj);
    } else {
      setVideoFile(null);
    }
  };

  const handleConfirmUpload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsUploadModalVisible(false);
      message.success("Video uploaded successfully!");
    }, 2000);
  };

  return (
    <article className="mentor-video-container">
      <h4 className="title">Olivia's Introductory Video Clip</h4>
      <p className="description">
        Get to know Olivia better through her video introduction.
      </p>

      {/* Video Upload Area */}
      <Upload
        accept="video/*"
        showUploadList={false}
        beforeUpload={() => false} // Prevent auto upload
        onChange={handleVideoChange}
        maxCount={1}
      >
        <div className={videoFile ? "video-container" : "upload-container"}>
          {videoFile ? (
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="video"
            />
          ) : (
            <div className="upload-content">
              <UploadOutlined className="upload-icon" />
              <p className="upload-text">
                Drag and drop a video file here or click to upload
              </p>
            </div>
          )}
        </div>
      </Upload>

      {/* Upload Button */}
      {videoFile && (
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
            loading={loading}
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
