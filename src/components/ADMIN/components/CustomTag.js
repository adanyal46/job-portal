// CustomTag.js
import "./styles.scss";

const CustomTag = ({ label, color, onClick }) => {
  return (
    <span
      className="custom-tag"
      style={{
        backgroundColor: color,
        color:
          label === "Approved"
            ? "#1BBB62"
            : label === "Disapproved"
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
