import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTranslations, fetchCreateTranslation, filterCompleted } from './shared/fetches';



const checkCompleted = async (token) => {
  let completed = [];
  let serverCompleted = await fetchTranslations(token)

  if (serverCompleted.length > 0) {
    return await filterCompleted(serverCompleted)
  }

  return completed;
};

const pushCompleted = (state, payload) => {
  const completed = state;
  const { active: word, token } = payload;
  completed.push(word);
  fetchCreateTranslation(token, word)

  return completed;
};


export const getCompleted = createAsyncThunk(
  'completed/getCompleted',
  async (token) => {
    const response = await checkCompleted(token);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);


const initialState = [];

export const completedSlice = createSlice({
  name: 'completed',
  initialState,
  reducers: {
    addCompleted: (state, action) => {
      return state = pushCompleted(state, action.payload);
    },
    restoreCompleted: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompleted.fulfilled, (state, action) => {
        return state = action.payload
      })
  }
})

export const { addCompleted, restoreCompleted } = completedSlice.actions;


export default completedSlice.reducer;