import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllWords } from './shared/fetches';

export const getWordsLength = createAsyncThunk(
  'words/getWords',
  async () => {
    const response = await fetchAllWords();
    // The value we return becomes the `fulfilled` action payload
    return response.length;
  }
);

const initialState = {length: 200};

export const wordsSlice = createSlice({
  name: 'completed',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWordsLength.fulfilled, (state, action) => {
        return state = {length: action.payload}
      })
  }
})


export default wordsSlice.reducer;