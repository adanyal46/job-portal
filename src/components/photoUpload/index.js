import { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Modal } from "antd";
import { UploadUserIcon } from "../../assets/svg";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./styles.scss";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PhotoUpload = ({ initialImageUrl, onChange, name = "avatarUrl" }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [previewImage, setPreviewImage] = useState("");
  const [showCropModal, setShowCropModal] = useState(false);
  const [crop, setCrop] = useState({ unit: "%", width: 100, aspect: 1 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [rawFile, setRawFile] = useState(null);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error("Image must be smaller than 10MB!");
      return false;
    }
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

  // Handle the cropped image
  const getCroppedImg = (image, crop) => {
    if (!crop || !image) return null;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = rawFile.name;
          const fileFromBlob = new File([blob], rawFile.name, {
            type: blob.type,
          });
          resolve(fileFromBlob);
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleCropComplete = (crop, percentageCrop) => {
    setCompletedCrop(crop);
  };

  const handleOk = async () => {
    if (!completedCrop || !imageRef) {
      message.error("Please complete cropping the image");
      return;
    }

    setLoading(true);
    try {
      const croppedFile = await getCroppedImg(imageRef, completedCrop);
      getBase64(croppedFile, (url) => {
        setImageUrl(url);
        onChange(name, croppedFile);
        setShowCropModal(false);
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      message.error("Failed to crop image");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCropModal(false);
    setRawFile(null);
    setPreviewImage("");
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
        title="Crop Image"
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
      </Modal>
    </>
  );
};

export default PhotoUpload;
