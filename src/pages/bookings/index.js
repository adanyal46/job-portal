import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../components/bookingCard";
import CustomPagination from "../../components/customPagination";
import CustomTabs from "../../components/customTabs";

import "./styles.scss";
import { useEffect } from "react";
import { getBookingSession } from "../../features/booking/bookingSlice";
import Loader from "../../components/Loader";

const BookingsListing = () => {
  const dispatch = useDispatch();

  const { bookings, loading, error } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getBookingSession());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="booking-listing-wrapper">
      {bookings?.map((book, index) => (
        <BookingCard {...book} key={index} />
      ))}
      {/* <CustomPagination /> */}
    </section>
  );
};

const NoBooking = () => {
  return (
    <section className="no-booking-empty-wrapper">
      <figure className="no-bookings-picture">
        <img loading="lazy" src="/images/no-bookings.png" alt="" className="" />
      </figure>
    </section>
  );
};

const Bookings = () => {
  const handleTabChange = (key) => {
    console.log(key);
  };

  return (
    <section className="main-layout-container">
      <h3 className="layout-main-heading">Bookings</h3>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="today"
        items={[
          {
            key: "today",
            label: "Today",
            children: <BookingsListing />,
          },
          {
            key: "upcoming",
            label: "Up Coming",
            children: <NoBooking />,
          },
          {
            key: "previous",
            label: "Previous",
            children: <NoBooking />,
          },
          {
            key: "customFilters",
            label: "Custom Filters",
            children: <NoBooking />,
          },
        ]}
      />
    </section>
  );
};

export default Bookings;
