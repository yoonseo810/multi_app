import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const editMemo = createAsyncThunk('memos/edit', async (memo) => {
  const res = await axiosInstance.put(`/api/notes/edit/${memo._id}`, {
    title: memo.title,
    content: memo.content,
  });
  return res.data.note;
});
