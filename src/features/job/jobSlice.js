// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { applyJobApi, getJobList, saveJobApi } from "./jobApi";

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
      const response = await applyJobApi(formData);
      const appliedJobData = response.data;
      const currentJobList = getState().job.jobs || [];

      const updatedJobList = currentJobList.map((job) => {
        const isApplied = job.JobApplied.some(
          (appliedJob) => appliedJob.jobId === appliedJobData.jobId
        );

        return {
          ...job,
          applied: true,
          JobApplied: isApplied
            ? job.JobApplied
            : [...job.JobApplied, appliedJobData],
        };
      });

      console.log(updatedJobList);

      return updatedJobList;
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);
export const saveJob = createAsyncThunk(
  "job/save",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const response = await saveJobApi(formData);
      const appliedJobData = response.data;
      const currentJobList = getState().job.jobs || [];

      const updatedJobList = currentJobList.map((job) => {
        const isSaved = job.saveJobpost.some(
          (savedJob) => savedJob.jobId === appliedJobData.jobId
        );

        return {
          ...job,
          saved: true, // Set saved to true for all jobs
          saveJobpost: isSaved
            ? job.saveJobpost // If jobId exists, do not modify saveJobpost
            : [...job.saveJobpost, appliedJobData], // If jobId doesn't exist, add it to saveJobpost
        };
      });

      console.log(updatedJobList);

      return updatedJobList;
    } catch (error) {
      return rejectWithValue(error.message); // Handle errors
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: null,
    loading: false,
    appliedLoading: false,
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
        state.error = action.payload;
      })
      .addCase(jobApplied.pending, (state) => {
        state.appliedLoading = true;
        state.error = null;
      })
      .addCase(jobApplied.fulfilled, (state, action) => {
        state.appliedLoading = false;
        state.jobs = action.payload;
      })
      .addCase(jobApplied.rejected, (state, action) => {
        state.appliedLoading = false;
        state.error = action.payload;
      })
      .addCase(saveJob.pending, (state) => {
        state.appliedLoading = true;
        state.error = null;
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.appliedLoading = false;
        state.jobs = action.payload;
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.appliedLoading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
