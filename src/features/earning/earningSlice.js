import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEarningApi } from "./earningApi";

// Async thunk for fetching earnings
export const fetchEarningList = createAsyncThunk(
  "earning/fetchEarningList",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const response = await getEarningApi(startDate, endDate);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const earningSlice = createSlice({
  name: "earning",
  initialState: {
    earningList: [],
    loading: false,
    error: null,
    dateRange: { from: null, to: null }, // State for date range
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload; // Action to set date range
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarningList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEarningList.fulfilled, (state, action) => {
        state.loading = false;
        state.earningList = action.payload; // Assuming response contains earning data
      })
      .addCase(fetchEarningList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { setDateRange } = earningSlice.actions; // Exporting the date range action
export default earningSlice.reducer;
