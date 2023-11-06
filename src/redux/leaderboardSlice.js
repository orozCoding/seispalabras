import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLeaderboard } from "./shared/fetches";

const initialState = {
  status: "idle",
  leaderboard: [],
};

export const getLeaderboard = createAsyncThunk("leaderboard/getLeaderboard", async () => {
  const response = await fetchLeaderboard();
  return response;
});

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.status = "idle";
      });
  },
});

export default leaderboardSlice.reducer;
