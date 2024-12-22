import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmployerApi } from "./userApi";

// Thunk for fetching employers
export const fetchEmployers = createAsyncThunk(
  "employers/fetch",
  async ({ page, pageSize, sortOrder, search }, { rejectWithValue }) => {
    try {
      const response = await fetchEmployerApi({
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

const employersSlice = createSlice({
  name: "employers",
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
      .addCase(fetchEmployers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.Employers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEmployers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employersSlice.reducer;
