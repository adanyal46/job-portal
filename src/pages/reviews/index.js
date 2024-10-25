import {Flex, Typography} from "antd";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";
import ReviewCard from "../../components/reviewCard";

import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchMentorReviews} from "../../features/mentorReviews/mentorReviewSlice";
import {useEffect} from "react";
import {RecruiterReviewNotList} from "../../assets/svg";

const ReviewsList = () => {
    const dispatch = useDispatch();
    const {reviews, loading, error} = useSelector(
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
                {reviews.length > 0 && (
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review}/>
                    ))
                )}
            </section>
            {reviews.length === 0 &&
                <Flex style={{minHeight: "calc(100vh - 340px)"}} justify={'center'} align={'center'}
                      className={'w-100'}>
                    <RecruiterReviewNotList/>
                </Flex>}
            {/* <CustomPagination /> */}
        </section>
    );
};

const Reviews = () => {
    const handleTabChange = (key) => {
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
                        children: <ReviewsList/>,
                    },
                    {
                        key: "latest",
                        label: "Latest",
                        children: <ReviewsList/>,
                    },
                ]}
            />
        </section>
    );
};

export default Reviews;
