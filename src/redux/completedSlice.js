/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTranslations, fetchCreateTranslation, filterCompleted } from './shared/fetches';

const checkCompleted = async (token) => {
  const completed = [];
  const serverCompleted = await fetchTranslations(token);

  if (serverCompleted.length > 0) {
    return filterCompleted(serverCompleted);
  }

  return completed;
};

const pushCompleted = (state, payload) => {
  const completed = state;
  const { active: word, token } = payload;
  completed.unshift(word);
  fetchCreateTranslation(token, word);

  return completed;
};

export const getCompleted = createAsyncThunk(
  'completed/getCompleted',
  async (token) => {
    const response = await checkCompleted(token);
    // The value we return becomes the `fulfilled` action payload

    return response;
  },
);

const initialState = [];

export const completedSlice = createSlice({
  name: 'completed',
  initialState,
  reducers: {
    addCompleted: (state, action) => state = pushCompleted(state, action.payload),
    restoreCompleted: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompleted.fulfilled, (state, action) => state = action.payload);
  },
});

export const { addCompleted, restoreCompleted } = completedSlice.actions;

export default completedSlice.reducer;
