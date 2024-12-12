"use client";

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiPostRegister ,apiPostLogin} from '../../../services/apiService'
export const loginUser = createAsyncThunk('auth/loginUser', apiPostLogin);

export const registerUser = createAsyncThunk('auth/registerUser',apiPostRegister);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    status: 'idle',
    error: null,
    loginUrl: "/",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    changeLoginUrl: (state, action) => {
      state.loginUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout, changeLoginUrl } = authSlice.actions;

export default authSlice.reducer;
