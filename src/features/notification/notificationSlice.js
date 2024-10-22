import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationList, handleApproveNotificationApi, postReviewNotification } from "./notificationApi";

// Async thunk for fetching notifications
export const fetchNotificationList = createAsyncThunk(
  "notifications/fetchNotificationList",
  async () => {
    const response = await getNotificationList();
    return response.data;
  }
);
export const createNotificationReview = createAsyncThunk(
  "notifications/review/post",
  async (formData) => {
    const response = await postReviewNotification(formData);
    return response.data;
  }
);
export const approveNotification = createAsyncThunk(
  "notifications/recruiter/approve",
  async (formData) => {
    const response = await handleApproveNotificationApi(formData);
    return response.data;
  }
);

// Create the notification slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    reviewLoading: false,
    reviewNotification: null,
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationList.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload; // Set notifications to the fetched data
      })
      .addCase(fetchNotificationList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(createNotificationReview.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(createNotificationReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviewNotification = action.payload;
      })
      .addCase(createNotificationReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(approveNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveNotification.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(approveNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

// Export actions and reducer
export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
