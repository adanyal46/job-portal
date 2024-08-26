import { Button, message, Upload } from "antd";

import { DocumentUploadIcon } from "../../assets/svg";

import "./styles.scss";

const DocumentUploader = (props) => {
  const { title } = props;

  const uploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    className: "custom-document-uploader-container",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button className="custom-uploader-button" icon={<DocumentUploadIcon />}>
        <span className="uploader-button-title">{title}</span>
      </Button>
    </Upload>
  );
};

export default DocumentUploader;
