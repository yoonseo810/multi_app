import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const registerUser = createAsyncThunk(
  'users/register',
  async (userCredential) => {
    const res = await axiosInstance.post('/api/users/create', userCredential);
    return res.data;
  }
);
