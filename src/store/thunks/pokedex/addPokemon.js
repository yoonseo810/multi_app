import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const addPokemon = createAsyncThunk('pokemon/add', async (pokemon) => {
  const res = await axiosInstance.post('/api/pokemon/add', pokemon);
  return res.data.data;
});
