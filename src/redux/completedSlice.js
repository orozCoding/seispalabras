import { createSlice } from '@reduxjs/toolkit';

const checkCompleted = () => {
  let completed = [];

  if (localStorage.getItem('completed')) {
    completed = JSON.parse(localStorage.getItem('completed'));
  } else {
    localStorage.setItem('completed', JSON.stringify(completed));
  }

  return completed;
};

const pushCompleted = (word) => {
  const completed = JSON.parse(localStorage.getItem('completed'));
  completed.push(word);
  localStorage.setItem('completed', JSON.stringify(completed));

  return completed;
};


const initialState = [];

export const completedSlice = createSlice({
  name: 'completed',
  initialState,
  reducers: {
    getCompleted: () => {
      return checkCompleted();
    },
    addCompleted: (state, action) => {
      return state = pushCompleted(action.payload)
    }
  }
})

export const { getCompleted, addCompleted } = completedSlice.actions;


export default completedSlice.reducer;