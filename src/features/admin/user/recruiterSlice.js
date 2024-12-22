import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecruiterApi } from "./userApi";
import { act } from "react";

// Thunk for fetching recruiters
export const fetchRecruiters = createAsyncThunk(
  "recruiters/fetch",
  async ({ page, pageSize, sortOrder, search }, { rejectWithValue }) => {
    try {
      const response = await fetchRecruiterApi({
        page,
        pageSize,
        sortOrder,
        search,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const recruitersSlice = createSlice({
  name: "recruiters",
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
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecruiters.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.data = action.payload.recruiter; // Adjust this line based on the API response structure
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recruitersSlice.reducer;
