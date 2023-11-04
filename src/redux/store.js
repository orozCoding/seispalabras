import { configureStore } from "@reduxjs/toolkit";
import completedReducer from "./completedSlice";
import userReducer from "./userSlice";
import soundReducer from "./soundSlice";

const store = configureStore({
  reducer: {
    completed: completedReducer,
    user: userReducer,
    sound: soundReducer,
  },
});

export default store;
