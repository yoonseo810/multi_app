import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const getUserInfo = createAsyncThunk('users/getUser', async () => {
  const res = await axiosInstance.get('/api/users/getUser');
  return res.data;
});
