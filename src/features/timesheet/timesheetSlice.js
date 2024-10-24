import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { recruiterProgressRoleApi, recruiterRoleApi, recruiterTimesheetListApi } from "./timesheetApi";

// Async thunk for fetching notifications
export const fetchRecruiterRole = createAsyncThunk("timesheet/roles", async () => {
  try {
    const response = await recruiterRoleApi();
    return response.data;
  } catch (error) {
    return error;
  }
});
export const fetchRecruiterProgressRole = createAsyncThunk("timesheet/progress-roles", async () => {
  try {
    const response = await recruiterProgressRoleApi();
    return response.data;
  } catch (error) {
    return error;
  }
});
export const fetchRecruiterAddTimesheetList = createAsyncThunk("timesheet/add-timesheet-list", async () => {
    try {
      const response = await recruiterTimesheetListApi();
      return response.data;
    } catch (error) {
      return error;
    }
  });
// Create the notification slice
const timesheetSlice = createSlice({
  name: "timsheet",
  initialState: {
    roles: [],
    progressRole: [],
    addTimeSheetList: [],
    viewTimeSheetList: [],
    roleLoading: false,
    pRoleLoading: false,
    vtLoading: false,
    adlLoading: false,
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterRole.pending, (state) => {
        state.roleLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterRole.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRecruiterRole.rejected, (state, action) => {
        state.roleLoading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(fetchRecruiterProgressRole.pending, (state) => {
        state.pRoleLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterProgressRole.fulfilled, (state, action) => {
        state.pRoleLoading = false;
        state.progressRole = action.payload;
      })
      .addCase(fetchRecruiterProgressRole.rejected, (state, action) => {
        state.pRoleLoading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(fetchRecruiterAddTimesheetList.pending, (state) => {
        state.adlLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterAddTimesheetList.fulfilled, (state, action) => {
        state.adlLoading = false;
        state.addTimeSheetList = action.payload;
      })
      .addCase(fetchRecruiterAddTimesheetList.rejected, (state, action) => {
        state.adlLoading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

export default timesheetSlice.reducer;
