import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmployerBookingApi, fetchMentorBookingApi } from "./bookingApi";

export const getMentorBookings = createAsyncThunk(
  "dashboard/getMentorBookings",
  async (
    { userId, page, pageSize, sortOrder, search },
    { rejectWithValue }
  ) => {
    try {
      return await fetchMentorBookingApi(
        userId,
        page,
        pageSize,
        sortOrder,
        search
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getEmployerBookings = createAsyncThunk(
  "dashboard/getEmployerBookings",
  async ({ userId }, { rejectWithValue }) => {
    try {
      return await fetchEmployerBookingApi(userId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Custom action for clearing the error state
export const clearError = createAsyncThunk("dashboard/clearError", async () => {
  return null;
});

const adminMentorBookings = createSlice({
  name: "adminMentorBookings",
  initialState: {
    data: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      sortOrder: "asc",
      searchQuery: "",
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMentorBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMentorBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.bookings;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMentorBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployerBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployerBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getEmployerBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearError.fulfilled, (state) => {
        state.error = null; // Clear the error state
      });
  },
});

export default adminMentorBookings.reducer;
