import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotificationList } from "./notificationApi";

// Async thunk for fetching notifications
export const fetchNotificationList = createAsyncThunk(
  "notifications/fetchNotificationList",
  async () => {
    const response = await getNotificationList();
    return response.data;
  }
);

// Create the notification slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
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
      });
  },
});

// Export actions and reducer
export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
