import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMentorReviews } from "./mentorReviewApi";

// Async thunk for fetching mentor reviews
export const fetchMentorReviews = createAsyncThunk(
  "mentorReviews/fetchMentorReviews",
  async () => {
    const reviews = await getMentorReviews();
    return reviews.data.data;
  }
);

const mentorReviewSlice = createSlice({
  name: "mentorReviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    // You can add any additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentorReviews.pending, (state) => {
        state.loading = true; // Set loading to true when the request starts
        state.error = null; // Reset error
      })
      .addCase(fetchMentorReviews.fulfilled, (state, action) => {
        state.loading = false; // Request completed successfully
        state.reviews = action.payload; // Set reviews data
      })
      .addCase(fetchMentorReviews.rejected, (state, action) => {
        state.loading = false; // Request failed
        state.error = action.error.message; // Set the error message
      });
  },
});

// Export the reducer
export default mentorReviewSlice.reducer;
