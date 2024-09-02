import { RatingFilledIcon } from "../../assets/svg";

import "./styles.scss";

const Rating = (props) => {
  const { rating, reviews } = props;

  return (
    <article className="rating-container">
      <h6 className="rating">{rating}</h6>
      {Array(5)
        .fill()
        .map((_, index) => (
          <RatingFilledIcon key={`rating-star-${index}`} />
        ))}
      <p className="reviews">({reviews})</p>
    </article>
  );
};

export default Rating;
