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
import JobSeekerDetail from "./pages/jobSeekerRecruiter/JobSeekerDetail";
import AdminLayout from "./components/ADMIN/AdminLayout";
import AdminDashboard from "./components/ADMIN/AdminDashboard";
import AdminEmployer from "./components/ADMIN/AdminEmployer";
import AdminRecruiters from "./components/ADMIN/AdminRecruiters";
import AdminMentors from "./components/ADMIN/AdminMentors";
import AdminJobSeeker from "./components/ADMIN/AdminJobSeekers";
import AdminStaffs from "./components/ADMIN/AdminStaffs";
import Industries from "./components/ADMIN/common-management/Industries";
import MentorServices from "./components/ADMIN/common-management/MentorServices";
import RecruiterServices from "./components/ADMIN/common-management/RecruiterServices";
import Languages from "./components/ADMIN/common-management/Languages";
import Skills from "./components/ADMIN/common-management/Skills";
import MentorProfileApprovalRequests from "./components/ADMIN/requests/MentorProfileApprovalRequests";
import RecruiterProfileApprovalRequests from "./components/ADMIN/requests/RecruiterProfileApprovalRequests";
import AdminRecruiterProfile from "./components/ADMIN/profile/AdminRecruiterProfile";
import AdminMentorProfile from "./components/ADMIN/profile/AdminMentorProfile";
import TimesheetManagement from "./components/ADMIN/timsheet-management";
import Setting from "./components/ADMIN/setting";
import Pages from "./components/ADMIN/pages";
import PrivacyPolicy from "./components/ADMIN/general-management/PrivacyPolicy";
import About from "./components/ADMIN/general-management/About";
import TermCondition from "./components/ADMIN/general-management/TermCondition";
import PaymentList from "./components/ADMIN/payment";
import BlogAdmin from "./components/ADMIN/blogs";
import AdminBookings from "./components/ADMIN/AdminBookings";
import AdminMentorBookings from "./components/ADMIN/AdminMentorBookings";
import AdminEmployerBookings from "./components/ADMIN/AdminEmployerBookings";
import AdminMentorReview from "./components/ADMIN/AdminMentorReview";
import Home from "./guest-view/Home";
import GuestLayout from "./guest-view/Layout";
import ResetPassword from "./guest-view/ResetPassword";
import ForgetPassword from "./guest-view/ForgetPassword";
import SignUpPageUserType from "./guest-view/SignUpPageUserType";
import RegisterForm from "./pages/signUp";
import AdminHireRecruiter from "./components/ADMIN/AdminHireRecruiter";
import AdminHireRecDetail from "./components/ADMIN/AdminHireRecDetail";
import PopupInfo from "./components/ADMIN/popup-info";
import EditPostNote from "./components/ADMIN/edit-post-note";

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
const EmployerSubscription = lazy(() => import("./pages/employerSubscription"));

const routeConfig = (token) => {
  const decodedToken = tokenDecoder(token);

  // Common routes (available to all users)
  const commonRoutes = [
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/signup-type",
      element: <SignUpPageUserType />,
    },
    {
      path: "/register/:role",
      element: <RegisterForm />,
    },
    {
      path: "/",
      element: <GuestLayout />,
      children: [
        {
          path: "/",
          element: <Home />, // Public or shared home page
          errorElement: <ErrorPage />,
        },
      ],
    },
  ];
  if (!decodedToken) {
    return [
      ...commonRoutes,
      {
        path: "*",
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
          path: "talent/:id",
          element: <JobSeekerDetail />,
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
  const staffMemberRoutes = [
    {
      path: "*",
      element: <Navigate to={"/staff/dashboard"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/staff",
      element: <Layout />,
      children: [
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
          path: "settings",
          element: <Settings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "subscriptions",
          element: <EmployerSubscription />,
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
      ],
    },
  ];

  const adminRoutes = [
    {
      path: "*",
      element: <Navigate to={"/admin/dashboard"} replace />,
      errorElement: <ErrorPage />, // Adding Error Page for error handling
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "dashboard",
          element: <AdminDashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/employers",
          element: <AdminEmployer />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/employers/bookings/:id",
          element: <AdminEmployerBookings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/recruiters",
          element: <AdminRecruiters />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/recruiters/:id",
          element: <AdminRecruiterProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/mentors",
          element: <AdminMentors />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/mentors/review/:id",
          element: <AdminMentorReview />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/mentors/bookings/:id",
          element: <AdminMentorBookings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/mentor/profile/:id",
          element: <AdminMentorProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/job-seekers",
          element: <AdminJobSeeker />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/staffs",
          element: <AdminStaffs />,
          errorElement: <ErrorPage />,
        },
        {
          path: "user/bookings",
          element: <AdminBookings />,
          errorElement: <ErrorPage />,
        },
        {
          path: "industries",
          element: <Industries />,
          errorElement: <ErrorPage />,
        },
        {
          path: "mentor-services",
          element: <MentorServices />,
          errorElement: <ErrorPage />,
        },
        {
          path: "recruiter-services",
          element: <RecruiterServices />,
          errorElement: <ErrorPage />,
        },
        {
          path: "languages",
          element: <Languages />,
          errorElement: <ErrorPage />,
        },
        {
          path: "skills",
          element: <Skills />,
          errorElement: <ErrorPage />,
        },
        {
          path: "mentor-profile-approval-requests",
          element: <MentorProfileApprovalRequests />,
          errorElement: <ErrorPage />,
        },
        {
          path: "recruiter-profile-approval-requests",
          element: <RecruiterProfileApprovalRequests />,
          errorElement: <ErrorPage />,
        },
        {
          path: "hire-recruiter",
          element: <AdminHireRecruiter />,
          errorElement: <ErrorPage />,
        },
        {
          path: "hire-recruiter/:bookingId",
          element: <AdminHireRecDetail />,
          errorElement: <ErrorPage />,
        },
        {
          path: "recruiter-profile/:id",
          element: <AdminRecruiterProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "mentor-profile/:id",
          element: <AdminMentorProfile />,
          errorElement: <ErrorPage />,
        },
        {
          path: "payments",
          element: <PaymentList />,
          errorElement: <ErrorPage />,
        },
        {
          path: "blogs",
          element: <BlogAdmin />,
          errorElement: <ErrorPage />,
        },
        {
          path: "timesheet-management",
          element: <TimesheetManagement />,
          errorElement: <ErrorPage />,
        },
        {
          path: "about",
          element: <About />,
          errorElement: <ErrorPage />,
        },
        {
          path: "term-condition",
          element: <TermCondition />,
          errorElement: <ErrorPage />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
          errorElement: <ErrorPage />,
        },
        {
          path: "pages",
          element: <Pages />,
          errorElement: <ErrorPage />,
        },
        {
          path: "popup-info",
          element: <PopupInfo />,
          errorElement: <ErrorPage />,
        },
        {
          path: "edit-post-note",
          element: <EditPostNote />,
          errorElement: <ErrorPage />,
        },
        {
          path: "settings",
          element: <Setting />,
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
    case Roles.STAFF_MEMBER:
      return [...staffMemberRoutes];
    case Roles.ADMIN:
      return [...adminRoutes];
    default:
      return [
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
        {
          path: "*",
          element: <Navigate to={"/login"} replace />,
          errorElement: <ErrorPage />,
        },
      ];
  }
};

export default routeConfig;
