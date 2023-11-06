import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import soundReducer from "./soundSlice";
import leaderboardSlice from "./leaderboardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sound: soundReducer,
    leaderboard: leaderboardSlice,
  },
});

export default store;
