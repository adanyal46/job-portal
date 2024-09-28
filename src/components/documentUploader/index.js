import { Button, message, Upload } from "antd";
import { DocumentUploadIcon } from "../../assets/svg";
import "./styles.scss";

const DocumentUploader = (props) => {
  const { title, onChange, name } = props;

  const allowedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const uploadProps = {
    name,
    action: "", // Ensure you have the upload action set here if needed
    className: "custom-document-uploader-container",
    beforeUpload: () => false,
    onChange(info) {
      if (info.fileList.length > 0) {
        const file = info.fileList[0];
        const isAllowedType = allowedFileTypes.includes(file.type);

        if (!isAllowedType) {
          message.error("You can only upload .doc, .docx, or .pdf files!");
          return onChange(name, "");
        }
        onChange(name, file.originFileObj);
      }
    },
    maxCount: 1,
    showUploadList: true, // Prevent showing the file list
    onRemove: () => {
      onChange(name, "");
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
