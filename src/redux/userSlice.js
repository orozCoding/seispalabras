import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setTokenCookie, getTokenCookie, deleteTokenCookie } from './shared/cookies';

const initialState = {
  logged: false,
  status: 'idle',
  error: null,
  student: null,
};

const fetchLogin = async (input) => {
  const url = 'http://localhost:3000/auth/login'

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input),
  })
    .then((resp) => resp.json())
    .then((data) => data)

  return resp
}

const fetchSession = async (token) => {
  const url = 'http://localhost:3000/session'

  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  })
    .then((resp) => resp.json())
    .then((data) => data)

  return resp
}

export const login = createAsyncThunk(
  'user/login',
  async (input) => {
    const response = await fetchLogin(input);
    // The value we return becomes the `fulfilled` action payload
    if (response.token) {
      const date = new Date(response.exp)
      setTokenCookie(response.token, date)
    }
    return response;
  }
);

export const checkSession = createAsyncThunk(
  'user/checkSession',
  async () => {
    console.log('holiiis');
    const token = getTokenCookie();

    if (token) {
      const response = await fetchSession(token);
      // The value we return becomes the `fulfilled` action payload
      if (response.token) {
        const date = new Date(response.exp)
        setTokenCookie(response.token, date)
      }
      return response;
    }
    return null
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      deleteTokenCookie();
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.error = action.payload.error;
          state.student = null;
          state.logged = false;
        } else {
          state.student = action.payload;
          state.logged = true;
          state.error = null;
        }
        state.status = 'idle';
      })
      .addCase(checkSession.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(checkSession.fulfilled, (state,action) => {
        if (!action.payload) {
          return initialState
        } else {
          state.student = action.payload;
          state.logged = true;
          state.error = null;
        }
        state.status = 'idle'
      })
  }
})

export const { getCompleted, addCompleted, logOut } = userSlice.actions;


export default userSlice.reducer;