// CustomTag.js
import "./styles.scss";

const CustomTag = ({ label, color, onClick }) => {
  return (
    <span
      className="custom-tag-admin"
      style={{
        backgroundColor:
          label === "Approved" ||
          label === "APPROVED" ||
          label === "ACCEPTED" ||
          label === "Paid" ||
          label === "Session" ||
          label === "Resume Search" ||
          label === "Premium" ||
          label === "Job Postings"
            ? "#DAF9E8"
            : label === "Disapproved" ||
              label === "Unpaid" ||
              label === "DISAPPROVED"
            ? "#F8EEED"
            : label === "Pending" || label === "PENDING"
            ? "#FAF4EE"
            : color,
        color:
          label === "Approved" ||
          label === "APPROVED" ||
          label === "ACCEPTED" ||
          label === "Paid" ||
          label === "Session" ||
          label === "Resume Search" ||
          label === "Premium" ||
          label === "Job Postings"
            ? "#1BBB62"
            : label === "Disapproved" ||
              label === "DISAPPROVED" ||
              label === "Unpaid"
            ? "#E8381A"
            : "#F9912E",
      }}
      onClick={onClick}
    >
      {label}
    </span>
  );
};

export default CustomTag;
