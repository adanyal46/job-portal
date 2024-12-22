import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createEntityThunks = (api) => ({
  fetchEntities: createAsyncThunk(
    `${api.name}/fetch`,
    async ({ page, search }, { rejectWithValue }) => {
      try {
        const response = await api.fetch(page, search);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  ),
  addEntity: createAsyncThunk(
    `${api.name}/add`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.add(data);
        return response;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add entity");
      }
    }
  ),
  updateEntity: createAsyncThunk(
    `${api.name}/update`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await api.update(id, data);
        return response;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || "Failed to update entity"
        );
      }
    }
  ),
  deleteEntity: createAsyncThunk(
    `${api.name}/delete`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.delete(id);
        return response;
      } catch (error) {
        return rejectWithValue(
          error.response?.data || "Failed to delete entity"
        );
      }
    }
  ),
});

export const createEntitySlice = (name, thunks) => {
  return createSlice({
    name,
    initialState: {
      data: [],
      pagination: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
      },
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(thunks.fetchEntities.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunks.fetchEntities.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data || [];
          state.pagination = action.payload.pagination;
        })
        .addCase(thunks.fetchEntities.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(thunks.addEntity.fulfilled, (state, action) => {
          state.data.push(action.payload);
        })
        .addCase(thunks.updateEntity.fulfilled, (state, action) => {
          const index = state.data.findIndex(
            (ind) => ind.id === action.payload.id
          );
          if (index !== -1) {
            state.data[index] = action.payload;
          }
        })
        .addCase(thunks.deleteEntity.fulfilled, (state, action) => {
          state.data = state.data.filter((ind) => ind.id !== action.meta.arg);
        });
    },
  });
};
