// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyJobApi, getJobList } from "./jobApi";

// Thunk to handle fetching job list
export const jobList = createAsyncThunk(
  "job/list",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await getJobList(formData);
      return data.data; // Assuming data.data holds the job list
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const jobApplied = createAsyncThunk(
  "job/apply",
  async (formData, { getState, rejectWithValue }) => {
    try {
      // const data = await applyJobApi(formData);
      const currenJobList = getState().job.jobs;
      console.log(currenJobList);
      // return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(jobList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(jobList.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload; // Save job data
      })
      .addCase(jobList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store error
      });
  },
});

export default jobSlice.reducer;
