import { createSlice } from "@reduxjs/toolkit";

const initialState = true;

const checkSound = () => {
  if (localStorage.getItem("sp_sound")) {
    return JSON.parse(localStorage.getItem("sp_sound"));
  }
  return true;
};

export const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    getSound: () => checkSound(),
    volumeON: () => {
      localStorage.setItem("sp_sound", JSON.stringify(true));
      return true;
    },
    volumeOFF: () => {
      localStorage.setItem("sp_sound", JSON.stringify(false));
      return false;
    },
  },
});

export const { volumeON, volumeOFF, getSound } = soundSlice.actions;

export default soundSlice.reducer;
