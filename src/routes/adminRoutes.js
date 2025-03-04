import AdminLayout from "../components/ADMIN/AdminLayout";
import AdminDashboard from "../components/ADMIN/AdminDashboard";
import AdminEmployer from "../components/ADMIN/AdminEmployer";
import AdminRecruiters from "../components/ADMIN/AdminRecruiters";
import AdminMentors from "../components/ADMIN/AdminMentors";
import AdminJobSeeker from "../components/ADMIN/AdminJobSeekers";
import AdminStaffs from "../components/ADMIN/AdminStaffs";
import Industries from "../components/ADMIN/common-management/Industries";
import MentorServices from "../components/ADMIN/common-management/MentorServices";
import RecruiterServices from "../components/ADMIN/common-management/RecruiterServices";
import Languages from "../components/ADMIN/common-management/Languages";
import Skills from "../components/ADMIN/common-management/Skills";
import MentorProfileApprovalRequests from "../components/ADMIN/requests/MentorProfileApprovalRequests";
import RecruiterProfileApprovalRequests from "../components/ADMIN/requests/RecruiterProfileApprovalRequests";
import AdminRecruiterProfile from "../components/ADMIN/profile/AdminRecruiterProfile";
import AdminMentorProfile from "../components/ADMIN/profile/AdminMentorProfile";
import TimesheetManagement from "../components/ADMIN/timsheet-management";
import Setting from "../components/ADMIN/setting";
import Pages from "../components/ADMIN/pages";
import PrivacyPolicy from "../components/ADMIN/general-management/PrivacyPolicy";
import About from "../components/ADMIN/general-management/About";
import TermCondition from "../components/ADMIN/general-management/TermCondition";
import PaymentList from "../components/ADMIN/payment";
import BlogAdmin from "../components/ADMIN/blogs";
import AdminBookings from "../components/ADMIN/AdminBookings";
import AdminMentorBookings from "../components/ADMIN/AdminMentorBookings";
import AdminEmployerBookings from "../components/ADMIN/AdminEmployerBookings";
import AdminMentorReview from "../components/ADMIN/AdminMentorReview";
import AdminHireRecruiter from "../components/ADMIN/AdminHireRecruiter";
import AdminHireRecDetail from "../components/ADMIN/AdminHireRecDetail";
import PopupInfo from "../components/ADMIN/popup-info";
import EditPostNote from "../components/ADMIN/edit-post-note";
import ErrorPage from "../ErrorPage";
import { Navigate } from "react-router-dom";
import AdminEditBlog from "../components/ADMIN/blogs/AdminEditBlog";
import ViewTimeSheet from "../components/ADMIN/timsheet-management/ViewTimeSheet";
import AdminNotification from "../components/ADMIN/AdminNotification";
import AdminJobSeekerProfile from "../components/ADMIN/AdminJobSeekerProfile";
import AdminEmployerPayment from "../components/ADMIN/AdminEmployerPayment";
import AdminRecruiterProfileS from "../components/ADMIN/profile/AdminRecruiterProfileS";
export const adminRoutes = [
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
        path: "notifications",
        element: <AdminNotification />,
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
        path: "user/employers/payment/:id",
        element: <AdminEmployerPayment />,
        errorElement: <ErrorPage />,
      },
      {
        path: "user/recruiters",
        element: <AdminRecruiters />,
        errorElement: <ErrorPage />,
      },
      {
        path: "user/recruiters/:id",
        element: <AdminRecruiterProfileS />,
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
        path: "user/job-seeker/:id",
        element: <AdminJobSeekerProfile />,
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
        path: "blogs/:id",
        element: <AdminEditBlog />,
        errorElement: <ErrorPage />,
      },
      {
        path: "timesheet-management",
        element: <TimesheetManagement />,
        errorElement: <ErrorPage />,
      },
      {
        path: "timesheet/view/:id",
        element: <ViewTimeSheet />,
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
