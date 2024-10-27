import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllJobseekerRecruiterApi } from "./recruiterApi";

// Async thunk for fetching earnings
export const fetchJobSeekerList = createAsyncThunk(
  "recruiter/getAllJobseeker",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllJobseekerRecruiterApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    jobSeekerList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobSeekerList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobSeekerList.fulfilled, (state, action) => {
        state.loading = false;
        state.jobSeekerList = action.payload.data;
      })
      .addCase(fetchJobSeekerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recruiterSlice.reducer;
