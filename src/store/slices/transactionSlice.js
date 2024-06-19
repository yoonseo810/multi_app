import { createSlice } from '@reduxjs/toolkit';
import { fetchTransactions } from '../thunks/transaction/fetchTransactions';
import { deleteTransaction } from '../thunks/transaction/deleteTransaction';
import { addTransaction } from '../thunks/transaction/addTransaction';

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = [];
    });
    builder.addCase(deleteTransaction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (transaction) => transaction._id !== action.payload.id
      );
    });
    builder.addCase(deleteTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(addTransaction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTransaction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const transactionsReducer = transactionsSlice.reducer;
