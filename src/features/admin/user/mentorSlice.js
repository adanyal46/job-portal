import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMentorsApi } from "./userApi";

// Thunk for fetching mentors
export const fetchMentors = createAsyncThunk(
  "Mentors/fetchMentors",
  async ({ page, pageSize, sortOrder, search }, { rejectWithValue }) => {
    try {
      const response = await fetchMentorsApi({
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

const mentorsSlice = createSlice({
  name: "mentors",
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
      .addCase(fetchMentors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.mentors;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorsSlice.reducer;
