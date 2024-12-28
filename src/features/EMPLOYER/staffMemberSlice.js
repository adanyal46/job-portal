import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStaffMemberApi } from "./api";

export const fetchStaffMember = createAsyncThunk(
  "staffMember/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchStaffMemberApi();
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

const staffMemberSlice = createSlice({
  name: "staffMember",
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
      .addCase(fetchStaffMember.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchStaffMember.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default staffMemberSlice.reducer;
