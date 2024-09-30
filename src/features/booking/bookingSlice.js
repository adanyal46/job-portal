import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookSessionApi, getBookingSessionApi } from "./bookingApi";

// Async thunk for booking a session (optional)
export const bookSession = createAsyncThunk(
  "bookSession",
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await bookSessionApi(bookingDetails);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getBookingSession = createAsyncThunk(
  "bookSession/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBookingSessionApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    session: null,
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBookingDetails(state, action) {
      state.session = action.payload;
    },
    clearBookingDetails(state) {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookSession.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload; // Assuming response contains session data
      })
      .addCase(bookSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBookingSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBookingSession.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload; // Assuming response contains session data
      })
      .addCase(getBookingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer
export const { setBookingDetails, clearBookingDetails } = bookSlice.actions;
export default bookSlice.reducer;
