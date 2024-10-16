import { Typography } from "antd";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";
import ReviewCard from "../../components/reviewCard";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorReviews } from "../../features/mentorReviews/mentorReviewSlice";
import { useEffect } from "react";
const ReviewsList = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector(
    (state) => state.mentorReviews
  );

  useEffect(() => {
    dispatch(fetchMentorReviews());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="reviews-main-layout-container">
      <section className="review-cards-list-wrapper">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No reviews found.</p>
        )}
      </section>
      {/* <CustomPagination /> */}
    </section>
  );
};

const Reviews = () => {
  const handleTabChange = (key) => {};

  return (
    <section>
      <Typography.Title level={3}>Reviews</Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="earliest"
        items={[
          {
            key: "earliest",
            label: "Earliest",
            children: <ReviewsList />,
          },
          {
            key: "latest",
            label: "Latest",
            children: <ReviewsList />,
          },
        ]}
      />
    </section>
  );
};

export default Reviews;
