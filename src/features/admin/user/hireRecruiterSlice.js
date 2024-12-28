import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHireRecruiterApi } from "./userApi";

// Thunk for fetching employers
export const fetchHireRecruiter = createAsyncThunk(
  "hireRecruiter/fetch",
  async ({ page, pageSize, sortOrder, search }, { rejectWithValue }) => {
    try {
      const response = await fetchHireRecruiterApi({
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

const hireRecruiterSlice = createSlice({
  name: "hireRecruiter",
  initialState: {
    data: [],
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 10,
      searchQuery: "",
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHireRecruiter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHireRecruiter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.meta;
      })
      .addCase(fetchHireRecruiter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hireRecruiterSlice.reducer;
