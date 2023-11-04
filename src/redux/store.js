import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import soundReducer from "./soundSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sound: soundReducer,
  },
});

export default store;
