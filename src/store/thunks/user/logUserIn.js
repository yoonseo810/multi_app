import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const logUserIn = createAsyncThunk(
  'users/login',
  async (userCredential) => {
    try {
      const res = await axiosInstance.post('/api/users/login', userCredential);
      return res.data;
    } catch (err) {
      return err.response.data.message;
    }
  }
);
