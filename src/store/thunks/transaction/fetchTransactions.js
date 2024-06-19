import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const fetchTransactions = createAsyncThunk(
  'transactions/all',
  async () => {
    const res = await axiosInstance.get('/api/transactions/all');

    return res.data.data;
  }
);
