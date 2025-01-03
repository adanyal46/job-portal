import { Rate } from "antd"; // Import Rate from Ant Design
import "./styles.scss";

const Rating = ({ rating = 0, reviews = 0 }) => {
  // Ensure rating is a number
  const numericRating = Number(rating);

  return (
    <article className="rating-container" style={{ gap: "10px" }}>
      <h6 className="rating">{numericRating.toFixed(1)}</h6>

      {/* Use Ant Design Rate component */}
      <Rate
        allowHalf
        disabled
        value={numericRating} // Use value instead of defaultValue for controlled component
        style={{ fontSize: 16 }} // Customize the size of the stars if needed
      />

      <p className="reviews">({reviews})</p>
    </article>
  );
};

export default Rating;
