import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction) => {
    const res = await axiosInstance.post('/api/transactions/add', transaction);
    return res.data.data;
  }
);
