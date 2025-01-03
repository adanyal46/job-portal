import { Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import RecruiterProfile from "../pages/recruiterProfile";
import UpcomingBookings from "../pages/upcomingBookings";
import HistoryBookings from "../pages/historyBookings";
import RecruiterNotification from "../pages/recruiterNotification";
import RecruiterNotificationDetail from "../pages/recruiterNotification/RecruiterNotificationDetail";
import JobSeekerRecruiter from "../pages/jobSeekerRecruiter";
import Settings from "../pages/settings";
import Earnings from "../pages/earnings";
import Blogs from "../pages/blogs";
import AddTimesheet from "../pages/timesheet/addTimesheet";
import { lazy } from "react";
import Reviews from "../pages/reviews";
import Layout from "../Layout";
import RecruiterDashboard from "../pages/recruiterDashboard";
const Timesheet = lazy(() => import("../pages/timesheet/viewTimesheet"));
const JobSeekerRecruiterDetail = lazy(() =>
  import("../pages/jobSeekerRecruiter/JobSeekerDetail")
);
export const recruiterRoutes = [
  {
    path: "*",
    element: <Navigate to={"/recruiter/dashboard"} replace />,
    errorElement: <ErrorPage />, // Adding Error Page for error handling
  },
  {
    path: "/recruiter",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <RecruiterDashboard />,
        errorElement: <ErrorPage />,
      },
      {
        path: "profile",
        element: <RecruiterProfile />,
        errorElement: <ErrorPage />, // Adding Error Page for error handling
      },
      {
        path: "upcoming-bookings",
        element: <UpcomingBookings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "history-bookings",
        element: <HistoryBookings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notifications",
        element: <RecruiterNotification />,
        errorElement: <ErrorPage />,
      },
      {
        path: "notification/job-request/:id",
        element: <RecruiterNotificationDetail />,
        errorElement: <ErrorPage />,
      },

      {
        path: "reviews",
        element: <Reviews />,
        errorElement: <ErrorPage />,
      },
      {
        path: "jobseekers",
        element: <JobSeekerRecruiter />,
        errorElement: <ErrorPage />,
      },
      {
        path: "jobseeker/detail/:id",
        element: <JobSeekerRecruiterDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "earnings",
        element: <Earnings />,
        errorElement: <ErrorPage />,
      },
      {
        path: "blogs",
        element: <Blogs />,
        errorElement: <ErrorPage />,
      },
      {
        path: "timesheet",
        element: <Timesheet />,
        errorElement: <ErrorPage />,
      },
      {
        path: "create-timesheet/:id",
        element: <AddTimesheet />,
        errorElement: <ErrorPage />,
      },
    ],
  },
];
