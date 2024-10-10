import { Typography } from "antd";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";
import ReviewCard from "../../components/reviewCard";

import "./styles.scss";

const ReviewsList = () => {
  return (
    <section className="reviews-main-layout-container">
      <section className="review-cards-list-wrapper">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </section>
      <CustomPagination />
    </section>
  );
};

const Reviews = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

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
