import { createSlice } from '@reduxjs/toolkit';
import { logUserIn } from '../thunks/user/logUserIn';
import { getUserInfo } from '../thunks/user/getUserInfo';
import { registerUser } from '../thunks/user/registerUser';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loginData: {},
    registerData: {},
    user: {},
    isLoading: false,
    getUserInfoSuccess: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(logUserIn.pending, (state, action) => {
      state.isLoading = true;
      state.loginData = {};
    });
    builder.addCase(logUserIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginData = action.payload;
    });
    builder.addCase(logUserIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.loginData = {};
    });
    builder.addCase(getUserInfo.pending, (state, action) => {
      state.isLoading = true;
      state.getUserInfoSuccess = null;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.getUserInfoSuccess = true;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.user = {};
      state.getUserInfoSuccess = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerData = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.registerData = {};
    });
  },
});

export const usersReducer = usersSlice.reducer;
