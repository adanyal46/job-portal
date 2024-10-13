import { lazy } from "react";
import tokenDecoder from "./utils/jwtDecoder";
import { Roles } from "./utils/roles";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";

// Lazy loaded components
const MyProfile = lazy(() => import("./pages/myProfile"));
const UpcomingBookings = lazy(() => import("./pages/upcomingBookings"));
const HistoryBookings = lazy(() => import("./pages/historyBookings"));
const Reviews = lazy(() => import("./pages/reviews"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Mentors = lazy(() => import("./pages/mentors"));
const Bookings = lazy(() => import("./pages/bookings"));
const Notifications = lazy(() => import("./pages/notifications"));
const Settings = lazy(() => import("./pages/settings"));
const Earnings = lazy(() => import("./pages/earnings"));
const Blogs = lazy(() => import("./pages/blogs"));
const SignUp = lazy(() => import("./pages/signUp"));
const LoginForm = lazy(() => import("./pages/login"));
const MentorProfile = lazy(() => import("./components/mentorProfile"));
const MentorDetails = lazy(() => import("./pages/mentorDetails"));

const routeConfig = (token) => {
  const decodedToken = tokenDecoder(token);
  if (!decodedToken) {
    return [
      {
        path: "/",
        element: <Navigate to={"/login"} replace />,
        errorElement: <ErrorPage />, // Adding Error Page for error handling
      },
      {
        path: "/login",
        element: <LoginForm />,
        errorElement: <ErrorPage />, // Adding Error Page for error handling
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />, // Adding Error Page for error handling
      },
    ];
  }

  const { role } = decodedToken;

  const jobSeekerRoutes = [
    {
      path: "*",
      element: <Navigate to={"/job-seeker/profile"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/job-seeker",
      element: <Layout />,
      children: [
        {
          path: "profile",
          element: <MyProfile />,
          errorElement: <ErrorPage />, // Adding Error Page for error handling
        },
        {
          path: "jobs/search",
          element: <JobSearch />,
          errorElement: <ErrorPage />,
        },
        {
          path: "bookings",
          element: <Bookings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "mentors",
          element: <Mentors />,
          errorElement: <ErrorPage />,
        },
        {
          path: "mentor/mentorDetail",
          element: <MentorDetails />,
          errorElement: <ErrorPage />,
        },
        {
          path: "notifications",
          element: <Notifications />,
          errorElement: <ErrorPage />,
        },
        {
          path: "settings",
          element: <Settings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "blogs",
          element: <Blogs />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ];

  const mentorRoutes = [
    {
      path: "*",
      element: <Navigate to={"/mentor/profile"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/mentor",
      element: <Layout />,
      children: [
        {
          path: "profile",
          element: <MentorProfile />,
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
          element: <Notifications />,
          errorElement: <ErrorPage />,
        },
        {
          path: "reviews",
          element: <Reviews />,
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
      ],
    },
  ];

  switch (role) {
    case Roles.JOB_SEEKER:
      return [...jobSeekerRoutes];
    case Roles.MENTOR:
      return [...mentorRoutes];
    default:
      return [
        {
          path: "/login",
          element: <LoginForm />,
          errorElement: <ErrorPage />, // Adding Error Page for error handling
        },
        {
          path: "/signup",
          element: <SignUp />,
          errorElement: <ErrorPage />, // Adding Error Page for error handling
        },
        {
          path: "*",
          element: <Navigate to={"/login"} replace />,
          errorElement: <ErrorPage />, // Adding Error Page for error handling
        },
      ];
  }
};

export default routeConfig;
