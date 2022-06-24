import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  logged: false,
  status: 'idle',
  error: null,
  student:  null,
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

export const login = createAsyncThunk(
  'user/login',
  async (input) => {
    const response = await fetchLogin(input);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response;
  }
);



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending,  (state) => {
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
  }
})

export const { getCompleted, addCompleted, logOut  } = userSlice.actions;


export default userSlice.reducer;