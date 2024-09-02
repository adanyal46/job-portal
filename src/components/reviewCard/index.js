import Rating from "../rating";

import "./styles.scss";

const ReviewCard = () => {
  return (
    <section className="review-card-container">
      <section className="review-card-header">
        <figure className="review-card-icon">
          <img
            className="review-card-user-icon"
            loading="lazy"
            src="/images/review/user-icon.png"
            alt="review-card-user-icon"
          />
        </figure>

        <article className="review-card-details">
          <h4 className="name">Alina Smith</h4>
          <Rating reviews="32" rating="4.6" />
        </article>
      </section>

      <p className="review-card-content">
        Lorum ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet
        ipsum dolor sit amet ipsum dolor sit amet ipsum dolor sit amet ipsum
        dolor sit amet
      </p>
    </section>
  );
};

export default ReviewCard;
