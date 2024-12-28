import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPaymentApi } from "./userApi";

export const fetchPaymentList = createAsyncThunk(
  "payment/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchPaymentApi();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
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
      .addCase(fetchPaymentList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchPaymentList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
