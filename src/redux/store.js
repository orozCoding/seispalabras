import { configureStore } from '@reduxjs/toolkit';
import activesReducer from './activesSlice';
import completedReducer from './completedSlice';
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    completed: completedReducer,
    actives: activesReducer,
    user: userReducer
  },
});


export default store;