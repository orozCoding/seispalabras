/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = true;

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    volumeON: () => true,
    volumeOFF: () => false,
  },
});

export const { volumeON, volumeOFF } = soundSlice.actions;

export default soundSlice.reducer;
