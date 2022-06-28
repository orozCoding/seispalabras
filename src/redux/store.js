import { configureStore } from '@reduxjs/toolkit';
import activesReducer from './activesSlice';
import completedReducer from './completedSlice';
import userReducer from './userSlice';
import wordsReducer from './wordsSlice';
import soundReducer from './soundSlice';

const store = configureStore({
  reducer: {
    completed: completedReducer,
    actives: activesReducer,
    user: userReducer,
    words: wordsReducer,
    sound: soundReducer,
  },
});

export default store;
