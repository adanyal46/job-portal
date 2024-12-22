import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchJobSeekersApi } from "./userApi";

// Thunk for fetching job seekers
export const fetchJobSeekers = createAsyncThunk(
  "jobSeekers/fetchJobSeekers",
  async ({ page, pageSize, sortOrder, search }, { rejectWithValue }) => {
    try {
      const response = await fetchJobSeekersApi({
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

const jobSeekersSlice = createSlice({
  name: "jobSeekers",
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
      .addCase(fetchJobSeekers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobSeekers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.jobSeekers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobSeekers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSeekersSlice.reducer;
