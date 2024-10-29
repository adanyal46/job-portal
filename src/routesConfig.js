import { lazy } from "react";
import tokenDecoder from "./utils/jwtDecoder";
import { Roles } from "./utils/roles";
import Layout from "./Layout";
import { Navigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import RecruiterProfile from "./pages/recruiterProfile";
import JobDetail from "./pages/employerDashboard/JobDetail";
import ViewJobApplicantList from "./pages/employerDashboard/ViewJobApplicantList";
import EditJob from "./pages/employerDashboard/EditJob";
import ViewTimeSheetRecruiter from "./pages/employerDashboard/ViewTimesheetRecruiter";
import StaffMemberDetail from "./pages/employerDashboard/StaffMemberDetail";
import StaffMemberProfile from "./pages/employerDashboard/StaffMemberProfile";
import EmployerSetting from "./pages/employerSetting";
import RecruiterNotificationDetail from "./pages/recruiterNotification/RecruiterNotificationDetail";
import AddJob from "./pages/employerDashboard/AddJob";
import JobRequest from "./pages/employerDashboard/JobRequest";

// Lazy loaded components
const MyProfile = lazy(() => import("./pages/myProfile"));
const UpcomingBookings = lazy(() => import("./pages/upcomingBookings"));
const HistoryBookings = lazy(() => import("./pages/historyBookings"));
const Reviews = lazy(() => import("./pages/reviews"));
const JobSearch = lazy(() => import("./pages/jobSearch"));
const Mentors = lazy(() => import("./pages/mentors"));
const Bookings = lazy(() => import("./pages/bookings"));
const Notifications = lazy(() => import("./pages/notifications"));
const RecruiterNotification = lazy(() =>
  import("./pages/recruiterNotification")
);
const Settings = lazy(() => import("./pages/settings"));
const Earnings = lazy(() => import("./pages/earnings"));
const Blogs = lazy(() => import("./pages/blogs"));
const SignUp = lazy(() => import("./pages/signUp"));
const LoginForm = lazy(() => import("./pages/login"));
const MentorProfile = lazy(() => import("./components/mentorProfile"));
const MentorDetails = lazy(() => import("./pages/mentorDetails"));
const Timesheet = lazy(() => import("./pages/timesheet/viewTimesheet"));
const AddTimesheet = lazy(() => import("./pages/timesheet/addTimesheet"));
const EmployerProfile = lazy(() => import("./pages/empoyerProfile"));
const EmployerDashboard = lazy(() => import("./pages/employerDashboard"));
const EmployerJobs = lazy(() => import("./pages/employer-jobs"));
const EmployerHiredRecruiter = lazy(() => import("./pages/employer-recruiter"));
const EmployerStaffs = lazy(() => import("./pages/employer-staff"));
const EmployerTalent = lazy(() => import("./pages/employerTalent"));
const EmployerRecruiter = lazy(() => import("./pages/employerRecruiter"));
const JobSeekerRecruiter = lazy(() => import("./pages/jobSeekerRecruiter"));
const JobSeekerRecruiterDetail = lazy(() =>
  import("./pages/jobSeekerRecruiter/JobSeekerDetail")
);
const EmployerSubscription = lazy(() =>
  import("./pages/employerSubscription")
);

const routeConfig = (token) => {
  const decodedToken = tokenDecoder(token);
  if (!decodedToken) {
    return [
      {
        path: "/",
        element: <Navigate to={"/login"} replace />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />,
      },
    ];
  }

  const { role } = decodedToken;

  const jobSeekerRoutes = [
    {
      path: "*",
      element: <Navigate to={"/job-seeker/profile"} replace />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/job-seeker",
      element: <Layout />,
      children: [
        {
          path: "profile",
          element: <MyProfile />,
          errorElement: <ErrorPage />,
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

  const recruiterRoutes = [
    {
      path: "*",
      element: <Navigate to={"/recruiter/profile"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/recruiter",
      element: <Layout />,
      children: [
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

  const employerRoutes = [
    {
      path: "*",
      element: <Navigate to={"/employer/profile"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/employer",
      element: <Layout />,
      children: [
        {
          path: "profile",
          element: <EmployerProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "dashboard",
          element: <EmployerDashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "notifications",
          element: <RecruiterNotification />,
          errorElement: <ErrorPage />,
        },
        {
          path: "jobs",
          element: <EmployerJobs />,
          errorElement: <ErrorPage />,
        },
        {
          path: "hired-recruiter",
          element: <EmployerHiredRecruiter />,
          errorElement: <ErrorPage />,
        },
        {
          path: "staffs",
          element: <EmployerStaffs />,
          errorElement: <ErrorPage />,
        },
        {
          path: "talent",
          element: <EmployerTalent />,
          errorElement: <ErrorPage />,
        },
        {
          path: "recruiter",
          element: <EmployerRecruiter />,
          errorElement: <ErrorPage />,
        },
        {
          path: "job-detail/:id",
          element: <JobDetail />,
          errorElement: <ErrorPage />,
        },
        {
          path: "add-job",
          element: <AddJob />,
          errorElement: <ErrorPage />,
        },
        {
          path: "edit-job/:id",
          element: <EditJob />,
          errorElement: <ErrorPage />,
        },
        {
          path: "job-applicants/:id",
          element: <ViewJobApplicantList />,
          errorElement: <ErrorPage />,
        },
        {
          path: "view-timesheet-recruiter/:id",
          element: <ViewTimeSheetRecruiter />,
          errorElement: <ErrorPage />,
        },
        {
          path: "staff-member/:id",
          element: <StaffMemberDetail />,
          errorElement: <ErrorPage />,
        },
        {
          path: "profile/:id",
          element: <StaffMemberProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "job-request",
          element: <JobRequest />,
          errorElement: <ErrorPage />,
        },
       {
          path: "settings",
          element: <EmployerSetting />,
          errorElement: <ErrorPage />,
        }, 
       {
          path: "subscriptions",
          element: <EmployerSubscription />,
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
    case Roles.RECRUITER:
      return [...recruiterRoutes];
    case Roles.EMPLOYER:
      return [...employerRoutes];
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
