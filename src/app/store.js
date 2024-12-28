// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import jobReducer from "../features/job/jobSlice";
import mentorReducer from "../features/mentor/mentorSlice";
import notificationReducer from "../features/notification/notificationSlice";
import bookingReducer from "../features/booking/bookingSlice";
import mentorReviewReducer from "../features/mentorReviews/mentorReviewSlice";
import earningReducer from "../features/earning/earningSlice";
import timesheetReducer from "../features/timesheet/timesheetSlice";
import recruiterReducer from "../features/recruiter/recruiterSlice";
import employerDashboardReducer from "../features/employerDashboard/employerDashboardSlice";
import dashboardReducer from "../features/admin/dashboard/dashboardSlice";
import jobSeekerReducer from "../features/admin/user/jobSeekersSlice";
import mentorsReducer from "../features/admin/user/mentorSlice";
import adminMentorBookingReducer from "../features/admin/booking/bookingSlice";
import employerReducer from "../features/admin/user/employerSlice";
import AdminRecruiterReducer from "../features/admin/user/recruiterSlice";
import IndustryReducer from "../features/admin/common-management/slices/industrySlice";
import MentorServiceReducer from "../features/admin/common-management/slices/mentorServicesSlice";
import RecruiterServiceReducer from "../features/admin/common-management/slices/recruiterServicesSlice";
import LanguageReducer from "../features/admin/common-management/slices/languageSlice";
import SkillReducer from "../features/admin/common-management/slices/skillSlice";
import HireRecruiterReducer from "../features/admin/user/hireRecruiterSlice";
import ProfileApprovalReducer from "../features/admin/user/profileApprovalSlice";
import PaymentReducer from "../features/admin/user/paymentSlice";
import BlogReducer from "../features/admin/user/blogSlice";
import EmpStaffMemberReducer from "../features/EMPLOYER/staffMemberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    mentor: mentorReducer,
    notifications: notificationReducer,
    bookings: bookingReducer,
    mentorReviews: mentorReviewReducer,
    earning: earningReducer,
    timesheet: timesheetReducer,
    recruiter: recruiterReducer,
    employerDashboard: employerDashboardReducer,
    dashboard: dashboardReducer,
    jobSeekers: jobSeekerReducer,
    mentors: mentorsReducer,
    adminMentorBookings: adminMentorBookingReducer,
    employers: employerReducer,
    recruiters: AdminRecruiterReducer,
    industries: IndustryReducer,
    mentorService: MentorServiceReducer,
    recruiterService: RecruiterServiceReducer,
    languages: LanguageReducer,
    skills: SkillReducer,
    hireRecruiter: HireRecruiterReducer,
    profileApproval: ProfileApprovalReducer,
    payment: PaymentReducer,
    blog: BlogReducer,
    empStaffMember: EmpStaffMemberReducer,
  },
});
