import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMentorList } from "./mentorApi";

// Define the initial state
const initialState = {
  mentors: [],
  loading: false,
  error: null,
};

// Define the async thunk for fetching mentors
export const fetchMentorList = createAsyncThunk(
  "mentor/fetchMentorList",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await getMentorList(formData);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong");
    }
  }
);

// Create the mentor slice
const mentorSlice = createSlice({
  name: "mentor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMentorList.fulfilled, (state, action) => {
        state.loading = false;
        state.mentors = action.payload;
      })
      .addCase(fetchMentorList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mentorSlice.reducer;
