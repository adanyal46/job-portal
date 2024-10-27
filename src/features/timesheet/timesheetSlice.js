import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecruiterRoleDetail,
  recruiterProgressRoleApi,
  recruiterRoleApi,
  recruiterTimesheetListApi,
  recruiterTimeSheetPostAPi,
  recruiterViewTimesheetListApi,
} from "./timesheetApi";

// Async thunk for fetching notifications
export const fetchRecruiterRole = createAsyncThunk(
  "timesheet/roles",
  async () => {
    try {
      const response = await recruiterRoleApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchRecruiterProgressRole = createAsyncThunk(
  "timesheet/progress-roles",
  async () => {
    try {
      const response = await recruiterProgressRoleApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchRecruiterAddTimesheetList = createAsyncThunk(
  "timesheet/add-timesheet-list",
  async () => {
    try {
      const response = await recruiterTimesheetListApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchRecruiterViewTimesheetList = createAsyncThunk(
  "timesheet/view-timesheet-list",
  async () => {
    try {
      const response = await recruiterViewTimesheetListApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchRecruiterRoleDetail = createAsyncThunk(
  "timesheet/recruiter/detail",
  async (id) => {
    try {
      const response = await getRecruiterRoleDetail(id);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchrecruiterTimeSheetPost = createAsyncThunk(
  "timesheet/create/post",
  async (formData) => {
    try {
      const response = await recruiterTimeSheetPostAPi(formData);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
// Create the notification slice
const timesheetSlice = createSlice({
  name: "timsheet",
  initialState: {
    roles: [],
    progressRole: [],
    addTimeSheetList: [],
    viewTimeSheetList: [],
    roleDetail: null,
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
      })
      .addCase(fetchRecruiterRoleDetail.pending, (state) => {
        state.adlLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterRoleDetail.fulfilled, (state, action) => {
        state.adlLoading = false;
        state.roleDetail = action.payload;
      })
      .addCase(fetchRecruiterRoleDetail.rejected, (state, action) => {
        state.adlLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchrecruiterTimeSheetPost.pending, (state) => {
        state.adlLoading = true;
        state.error = null;
      })
      .addCase(fetchrecruiterTimeSheetPost.fulfilled, (state, action) => {
        state.adlLoading = false;
        state.addTimeSheetList = action.payload;
      })
      .addCase(fetchrecruiterTimeSheetPost.rejected, (state, action) => {
        state.adlLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecruiterViewTimesheetList.pending, (state) => {
        state.vtLoading = true;
        state.error = null;
      })
      .addCase(fetchRecruiterViewTimesheetList.fulfilled, (state, action) => {
        state.vtLoading = false;
        state.viewTimeSheetList = action.payload;
      })
      .addCase(fetchRecruiterViewTimesheetList.rejected, (state, action) => {
        state.vtLoading = false;
        state.error = action.error.message;
      });
  },
});

export default timesheetSlice.reducer;
