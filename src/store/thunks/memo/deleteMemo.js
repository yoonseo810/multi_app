import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

export const deleteMemo = createAsyncThunk('memos/delete', async (id) => {
  const response = await axiosInstance.delete(`/api/notes/delete/${id}`);

  return {
    id,
    data: response.data,
  };
});
