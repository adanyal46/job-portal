import Rating from "../rating";

import "./styles.scss";

const ReviewCard = ({ review }) => {
  return (
    <section className="review-card-container">
      <section className="review-card-header">
        <figure className="review-card-icon">
          <img className="review-card-user-icon" loading="lazy" src={review?.profilePhoto || "/images/review/user-icon.png"} alt="review-card-user-icon" />
        </figure>

        <article className="review-card-details">
          <h4 className="name">{review?.fullname || "Guest"}</h4>
          <Rating reviews={review?.totalReview ?? 0} rating={review?.rating ?? 0} />
        </article>
      </section>

      <p className="review-card-content">
        {review?.review ??
          "Lorum ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit ametipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet"}
      </p>
    </section>
  );
};

export default ReviewCard;
