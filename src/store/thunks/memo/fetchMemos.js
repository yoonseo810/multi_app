import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const fetchMemos = createAsyncThunk('memos/all', async () => {
  const res = await axiosInstance.get('/api/notes/all');

  return res.data.notes;
});
