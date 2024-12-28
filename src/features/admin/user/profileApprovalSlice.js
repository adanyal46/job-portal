import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProfileApprovalApi } from "./userApi";

export const fetchProfileApproval = createAsyncThunk(
  "profileApproval/fetch",
  async ({ role, page, pageSize, search }, { rejectWithValue }) => {
    try {
      const response = await fetchProfileApprovalApi({
        role,
        page,
        pageSize,
        search,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const profileApprovalSlice = createSlice({
  name: "profileApproval",
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
      .addCase(fetchProfileApproval.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProfileApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileApprovalSlice.reducer;
