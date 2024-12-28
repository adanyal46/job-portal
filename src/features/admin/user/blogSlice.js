import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogApi } from "./userApi";

export const fetchBlogList = createAsyncThunk(
  "payment/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBlogApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
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
      .addCase(fetchBlogList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchBlogList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blogSlice.reducer;
