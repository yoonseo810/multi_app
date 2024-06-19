import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id) => {
    const response = await axiosInstance.delete(
      `/api/transactions/delete/${id}`
    );
    return response.data;
  }
);
