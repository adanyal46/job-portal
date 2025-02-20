import Callback from "../Callback";
import ErrorPage from "../ErrorPage";
import AboutUs from "../guest-view/AboutUs";
import Employer from "../guest-view/Employer";
import Home from "../guest-view/Home";
import JobView from "../guest-view/JobView";
import GuestLayout from "../guest-view/Layout";
import Mentorship from "../guest-view/Mentorship";
import Partner from "../guest-view/Partner";
import PrivacyPolicy from "../guest-view/PrivacyPolicy";
import TermCondition from "../guest-view/TermCondition";

export const frontRoutes = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/jobs/view",
        element: <JobView />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/mentorship",
        element: <Mentorship />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/employers",
        element: <Employer />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/partners",
        element: <Partner />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/term-condition",
        element: <TermCondition />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/callback",
    element: <Callback />,
    errorElement: <ErrorPage />,
  },
];
