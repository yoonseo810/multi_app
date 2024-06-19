import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const removePokemon = createAsyncThunk('pokemon/delete', async (id) => {
  const res = await axiosInstance.delete(`/api/pokemon/delete/${id}`);
  return res.data;
});
