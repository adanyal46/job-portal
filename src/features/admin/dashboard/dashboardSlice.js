import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardCounts } from "./dashboardApi";

export const getDashboardCounts = createAsyncThunk(
  "dashboard/getDashboardCounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchDashboardCounts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    counts: {
      employeesCount: 0,
      jsCount: 0,
      recCount: 0,
      mentorCount: 0,
      mentorRev: 0,
      recRev: 0,
      jsRev: 0,
      cvRev: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(getDashboardCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
