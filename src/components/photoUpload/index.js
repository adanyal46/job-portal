import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadUserIcon } from "../../assets/svg";
import "./styles.scss";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const PhotoUpload = ({ initialImageUrl, onChange, name = "avatarUrl" }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleChange = (info) => {
    setLoading(true);
    getBase64(info.fileList[0].originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url); // Set the image URL directly from the selected file
      onChange(name, info.fileList[0].originFileObj);
    });
  };

  const uploadButton = (
    <button className="common-uploader-button" type="button">
      {loading ? <LoadingOutlined /> : <UploadUserIcon />}
      <p className="upload-button-label">Upload Image</p>
    </button>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="common-avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      action={false}
      beforeUpload={() => false}
      maxCount={1}
    >
      {imageUrl ? (
        <img
          loading="lazy"
          src={imageUrl}
          alt="avatar"
          style={{
            width: "100%",
            borderRadius: "100px",
            objectFit: "cover",
            height: "140px",
            maxWidth: "140px",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default PhotoUpload;
