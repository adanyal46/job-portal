import { Typography } from "antd";
import BookingCard, {
  BookingCardRecruiter,
} from "../../components/bookingCard";
import CustomTabs from "../../components/customTabs";
import tokenDecoder from "../../utils/jwtDecoder";
import { useDispatch, useSelector } from "react-redux";
import { upcomingBookingSession } from "../../features/booking/bookingSlice";
import { useEffect, useState } from "react";

const BookingsListingMentor = ({ bookingSession }) => {
  return (
    <>
      {bookingSession &&
      Array.isArray(bookingSession) &&
      bookingSession.length > 0 ? (
        bookingSession.map((booking) => (
          <section className="booking-listing-wrapper">
            <BookingCard
              mentor
              status={booking?.status}
              serviceName={booking?.serviceName}
              mentorName={booking?.jobSeekerName}
              date={booking?.date}
              time={booking?.time}
            />
          </section>
        ))
      ) : (
        <NoBooking />
      )}

      {/* <BookingCard mentor progress="In Progress" />
    <BookingCard mentor progress="Completed" /> */}
      {/* <CustomPagination /> */}
    </>
  );
};
const BookingsListingRecruiter = ({ bookingSession }) => {
  return (
    <>
      <section className="booking-listing-wrapper">
        {bookingSession &&
          Array.isArray(bookingSession) &&
          bookingSession.length > 0 &&
          bookingSession.map((booking) => (
            <BookingCardRecruiter
              mentor
              status={booking?.status}
              serviceName={booking?.serviceName}
              mentorName={booking?.fullname}
              date={booking?.date}
            />
          ))}
      </section>

      {/* <BookingCard mentor progress="In Progress" />
    <BookingCard mentor progress="Completed" /> */}
      {/* <CustomPagination /> */}
    </>
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

const HistoryBookings = () => {
  const [activeKey, setActiveKey] = useState("lastthreedays");
  const token = localStorage.getItem("token");
  const decodedToken = tokenDecoder(token);
  const USER_ROLE = decodedToken.role;
  const dispatch = useDispatch();
  const { bookingSession } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(upcomingBookingSession(activeKey));
  }, [dispatch, activeKey]);

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <section>
      <Typography.Title level={3}>
        Bookings History/Past Bookings
      </Typography.Title>

      <CustomTabs
        handleChange={handleTabChange}
        defaultActiveKey="last-3-Days"
        items={[
          {
            key: "lastthreedays",
            label: "Last 3 Days",
            children:
              bookingSession.length > 0 ? (
                USER_ROLE !== "RECRUITER" ? (
                  <BookingsListingMentor bookingSession={bookingSession} />
                ) : (
                  <BookingsListingRecruiter bookingSession={bookingSession} />
                )
              ) : (
                <NoBooking />
              ),
          },
          {
            key: "lastweek",
            label: "Last Week",
            children: <NoBooking />,
          },
          {
            key: "lastmonth",
            label: "Last Month",
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

export default HistoryBookings;
