import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const fetchFavourites = createAsyncThunk(
  'pokemon/favourites',
  async () => {
    const res = await axiosInstance.get('/api/pokemon/all');
    return res.data.data;
  }
);
