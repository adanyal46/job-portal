// src/features/employerDashboardSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getActivityList,
  getCountApi,
  getHireRecruiterList,
  getJobListApi,
  getRecruiterList,
  getStaffMemberByEmployeeId,
  getTalentList,
} from "./employerDashboardApi";

// Async thunk to fetch employer dashboard data
export const fetchEmployerDashboardData = createAsyncThunk(
  "employerDashboard/counts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCountApi();
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Internal Server Error";
      return rejectWithValue(message);
    }
  }
);
export const fetchStaffMemberEmp = createAsyncThunk(
  "employerStaff/EMPID",
  async (empId, { rejectWithValue }) => {
    try {
      const response = await getStaffMemberByEmployeeId(empId);
      return response.data;
    } catch (error) {
      const message = error?.message || "Internal Server Error";
      return rejectWithValue(message);
    }
  }
);

export const fetchJobList = createAsyncThunk(
  "employerDashboard/jobList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getJobListApi();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch job list";
      return rejectWithValue(message);
    }
  }
);
export const fetchActivityList = createAsyncThunk(
  "employerDashboard/activityList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivityList();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch job list";
      return rejectWithValue(message);
    }
  }
);
export const fetchTalentList = createAsyncThunk(
  "employerDashboard/talentList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTalentList();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch job list";
      return rejectWithValue(message);
    }
  }
);
export const fetchRecruiterList = createAsyncThunk(
  "employerDashboard/recruiterList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecruiterList();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch job list";
      return rejectWithValue(message);
    }
  }
);
export const fetchHireRecruiterList = createAsyncThunk(
  "employerDashboard/hireRecruiterList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getHireRecruiterList();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch job list";
      return rejectWithValue(message);
    }
  }
);

// Slice for employer dashboard
const employerDashboardSlice = createSlice({
  name: "employerDashboard",
  initialState: {
    counts: null,
    staffMembers: [],
    jobList: null,
    activity: null,
    talents: null,
    recruiters: null,
    loading: false,
    loadingCounts: false,
    loadingJobs: false,
    loadingActivity: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerDashboardData.pending, (state) => {
        state.loadingCounts = true;
        state.error = null;
      })
      .addCase(fetchEmployerDashboardData.fulfilled, (state, action) => {
        state.loadingCounts = false;
        state.counts = action.payload;
      })
      .addCase(fetchEmployerDashboardData.rejected, (state, action) => {
        state.loadingCounts = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchJobList.pending, (state) => {
        state.loadingJobs = true;
        state.error = null;
      })
      .addCase(fetchJobList.fulfilled, (state, action) => {
        state.loadingJobs = false;
        state.jobList = action.payload;
      })
      .addCase(fetchJobList.rejected, (state, action) => {
        state.loadingJobs = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchActivityList.pending, (state) => {
        state.loadingActivity = true;
        state.error = null;
      })
      .addCase(fetchActivityList.fulfilled, (state, action) => {
        state.loadingActivity = false;
        state.activity = action.payload;
      })
      .addCase(fetchActivityList.rejected, (state, action) => {
        state.loadingActivity = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchTalentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTalentList.fulfilled, (state, action) => {
        state.loading = false;
        state.talents = action.payload;
      })
      .addCase(fetchTalentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchRecruiterList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterList.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload;
      })
      .addCase(fetchRecruiterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchHireRecruiterList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHireRecruiterList.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload;
      })
      .addCase(fetchHireRecruiterList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpected error occurred";
      })
      .addCase(fetchStaffMemberEmp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffMemberEmp.fulfilled, (state, action) => {
        state.loading = false;
        state.staffMembers = action.payload.staffMembers;
      })
      .addCase(fetchStaffMemberEmp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unexpected error occurred";
      });
  },
});

// Export actions and reducer
export const { clearError } = employerDashboardSlice.actions;
export default employerDashboardSlice.reducer;
