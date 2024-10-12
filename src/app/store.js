// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import jobReducer from "../features/job/jobSlice";
import mentorReducer from "../features/mentor/mentorSlice";
import notificationReducer from "../features/notification/notificationSlice";
import bookingReducer from "../features/booking/bookingSlice";
import mentorReviewReducer from "../features/mentorReviews/mentorReviewSlice"; // Adjust the path as needed

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    job: jobReducer,
    mentor: mentorReducer,
    notifications: notificationReducer,
    bookings: bookingReducer,
    mentorReviews: mentorReviewReducer,
  },
});
