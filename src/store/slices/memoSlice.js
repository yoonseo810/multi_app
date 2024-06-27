import { createSlice } from '@reduxjs/toolkit';
import { fetchMemos } from '../thunks/memo/fetchMemos';
import { deleteMemo } from '../thunks/memo/deleteMemo';
import { createMemo } from '../thunks/memo/createMemo';
import { editMemo } from '../thunks/memo/editMemo';

const memosSlice = createSlice({
  name: 'memo',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    updatedData: {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMemos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMemos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMemos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = [];
    });
    builder.addCase(deleteMemo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMemo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((memo) => memo._id !== action.payload.id);
    });
    builder.addCase(deleteMemo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(createMemo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createMemo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(createMemo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(editMemo.pending, (state, action) => {
      state.isLoading = true;
      state.updatedData = {};
    });
    builder.addCase(editMemo.fulfilled, (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload._id) {
          return { ...action.payload };
        }
        return item;
      });
      state.updatedData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(editMemo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const memosReducer = memosSlice.reducer;
