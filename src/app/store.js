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
  },
});
