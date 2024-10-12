import Rating from "../rating";

import "./styles.scss";

const ReviewCard = ({ review }) => {
  console.log(review);
  return (
    <section className="review-card-container">
      <section className="review-card-header">
        <figure className="review-card-icon">
          <img
            className="review-card-user-icon"
            loading="lazy"
            src={review?.profilePhoto || "/images/review/user-icon.png"}
            alt="review-card-user-icon"
          />
        </figure>

        <article className="review-card-details">
          <h4 className="name">{review?.fullname || "Guest"}</h4>
          <Rating
            reviews={review?.totalReview ?? 0}
            rating={review?.rating ?? 0}
          />
        </article>
      </section>

      <p className="review-card-content">{review?.review}</p>
    </section>
  );
};

export default ReviewCard;
