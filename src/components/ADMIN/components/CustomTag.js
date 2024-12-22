// CustomTag.js
import "./styles.scss";

const CustomTag = ({ label, color, onClick }) => {
  return (
    <span
      className="custom-tag"
      style={{
        backgroundColor:
          label === "Approved" ||
          label === "ACCEPTED" ||
          label === "Paid" ||
          label === "Session" ||
          label === "Resume Search" ||
          label === "Premium" ||
          label === "Job Postings"
            ? "#DAF9E8"
            : label === "Disapproved" || label === "Unpaid"
            ? "#F8EEED"
            : label === "Pending"
            ? "#FAF4EE"
            : color,
        color:
          label === "Approved" ||
          label === "ACCEPTED" ||
          label === "Paid" ||
          label === "Session" ||
          label === "Resume Search" ||
          label === "Premium" ||
          label === "Job Postings"
            ? "#1BBB62"
            : label === "Disapproved" || label === "Unpaid"
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
