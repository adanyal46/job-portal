import { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Modal, Slider, Typography } from "antd";
import { UploadUserIcon } from "../../assets/svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./styles.scss";

const { Text } = Typography;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PhotoUpload = ({
  initialImageUrl,
  onChange,
  name = "avatarUrl",
  maxSizeMB = 1,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [previewImage, setPreviewImage] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(80);
  const [originalFileSize, setOriginalFileSize] = useState(0);
  const [compressedFileSize, setCompressedFileSize] = useState(0);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }

    // Allow file for preview but warn if over size limit
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.warning(
        `Image is larger than 10MB. It will be compressed before upload.`
      );
    }

    setOriginalFileSize(file.size);
    setRawFile(file);

    // Show cropping interface
    getBase64(file, (url) => {
      setPreviewImage(url);
      setShowCropModal(true);
    });
    return false; // Prevent auto upload
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
  };

  // Compress image using canvas
  const compressImage = (image, quality) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Use the crop dimensions or the full image
      const width = completedCrop ? completedCrop.width : image.width;
      const height = completedCrop ? completedCrop.height : image.height;

      canvas.width = width;
      canvas.height = height;

      // Draw the cropped/full image on the canvas
      if (completedCrop) {
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        ctx.drawImage(
          image,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          width,
          height
        );
      } else {
        ctx.drawImage(image, 0, 0, width, height);
      }

      // Convert to blob with compression
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            message.error("Failed to compress image");
            return;
          }

          // Create a new file from the blob
          const fileName = rawFile.name;
          const fileType =
            rawFile.type === "image/png" ? "image/png" : "image/jpeg";
          const newFile = new File([blob], fileName, { type: fileType });

          // Update compressed size for display
          setCompressedFileSize(blob.size);

          resolve(newFile);
        },
        rawFile.type, // Use original type
        quality / 100 // Convert percentage to 0-1 range
      );
    });
  };

  const handleCropComplete = (crop, percentageCrop) => {
    setCompletedCrop(crop);
  };

  const handleOk = async () => {
    if (!imageRef) {
      message.error("Image not loaded properly");
      return;
    }

    setLoading(true);
    try {
      // Compress the image with the current quality setting
      const processedFile = await compressImage(imageRef, compressionQuality);

      // Check if the compressed file is still too large
      const fileSizeMB = processedFile.size / 1024 / 1024;
      if (fileSizeMB > maxSizeMB) {
        message.warning(
          `Image is still ${fileSizeMB.toFixed(
            2
          )}MB after compression. Maximum allowed is ${maxSizeMB}MB.`
        );
        // You could auto-adjust quality here or let user try again
      }

      // Get base64 for preview
      getBase64(processedFile, (url) => {
        setImageUrl(url);
        onChange(name, processedFile);
        setShowCropModal(false);
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      message.error("Failed to process image");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCropModal(false);
    setRawFile(null);
    setPreviewImage("");
    setCompressedFileSize(0);
    setOriginalFileSize(0);
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const uploadButton = (
    <div className="common-uploader-button">
      {loading ? <LoadingOutlined /> : <UploadUserIcon />}
      <p className="upload-button-label">Upload Image</p>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="common-avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        accept="image/png, image/jpeg"
        multiple={false}
      >
        {imageUrl ? (
          <img
            loading="lazy"
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
              borderRadius: "100%",
              objectFit: "cover",
              height: "140px",
              maxWidth: "140px",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>

      <Modal
        title="Crop & Compress Image"
        open={showCropModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Apply"
        okButtonProps={{ loading: loading }}
        width={520}
        centered
      >
        <ReactCrop
          src={previewImage}
          crop={crop}
          onChange={(crop) => setCrop(crop)}
          onComplete={handleCropComplete}
          circularCrop
          aspect={1}
        >
          <img
            src={previewImage}
            alt="Crop preview"
            onLoad={(e) => setImageRef(e.currentTarget)}
            style={{ maxWidth: "100%" }}
          />
        </ReactCrop>

        <div style={{ marginTop: 20 }}>
          <Text strong>Image Quality</Text>
          <Slider
            min={10}
            max={100}
            value={compressionQuality}
            onChange={setCompressionQuality}
            step={5}
            marks={{
              10: "Low",
              50: "Medium",
              100: "High",
            }}
          />

          {originalFileSize > 0 && (
            <div style={{ marginTop: 10 }}>
              <Text>Original size: {formatFileSize(originalFileSize)}</Text>
              {compressedFileSize > 0 && (
                <>
                  <br />
                  <Text>
                    Estimated size after compression:{" "}
                    {formatFileSize(compressedFileSize)}
                  </Text>
                  <br />
                  <Text
                    style={{
                      color:
                        compressedFileSize > maxSizeMB * 1024 * 1024
                          ? "red"
                          : "green",
                    }}
                  >
                    {compressedFileSize > maxSizeMB * 1024 * 1024
                      ? `Image exceeds the maximum limit of ${maxSizeMB}MB. Please reduce quality further.`
                      : `Image is within the ${maxSizeMB}MB limit.`}
                  </Text>
                </>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PhotoUpload;
