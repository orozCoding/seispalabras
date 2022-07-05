/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setTokenCookie, getTokenCookie, deleteTokenCookie } from './shared/cookies';
import { fetchSignup, fetchLogin, fetchSession } from './shared/fetches';

const initialState = {
  logged: false,
  registered: false,
  status: 'idle',
  error: { login: [], signup: [] },
  student: null,
};

export const signup = createAsyncThunk(
  'user/signup',
  async (input) => {
    const response = await fetchSignup(input);
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (input) => {
    const response = await fetchLogin(input);
    // The value we return becomes the `fulfilled` action payload
    if (response.token) {
      const date = new Date(response.exp);
      setTokenCookie(response.token, date);
    }
    return response;
  },
);

export const checkSession = createAsyncThunk(
  'user/checkSession',
  async () => {
    const token = getTokenCookie();

    if (token) {
      const response = await fetchSession(token);
      return { ...response, token };
    }
    return null;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      deleteTokenCookie();
      return initialState;
    },
    cleanErrors: (state) => {
      state.error = { login: [], signup: [] };
    },
    cleanRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.error.signup = action.payload;
        } else if (action.payload.id) {
          state.registered = true;
          state.error.signup = [];
        }
        state.status = 'idle';
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error.login = action.payload.error;
          state.student = null;
          state.logged = false;
        } else {
          state.student = action.payload;
          state.logged = true;
          state.error.login = [];
          toast(`Welcome ${state.student.name}`);
        }
        state.status = 'idle';
      })
      .addCase(checkSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        if (!action.payload || action.payload.error || action.payload.errors) {
          deleteTokenCookie();
          return initialState;
        }
        state.student = action.payload;
        state.logged = true;
        state.error = null;

        state.status = 'idle';
        toast(`Welcome back ${state.student.name}`);
      });
  },
});

export const {
  getCompleted, addCompleted,
  logOut, cleanErrors, cleanRegistered,
} = userSlice.actions;

export default userSlice.reducer;
