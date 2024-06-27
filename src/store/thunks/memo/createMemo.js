import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const createMemo = createAsyncThunk('memos/add', async (memo) => {
  const res = await axiosInstance.post('/api/notes/add', memo);
  return res.data.note;
});
