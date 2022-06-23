import { configureStore } from '@reduxjs/toolkit';
import activesReducer from './activesSlice';
import completedReducer from './completedSlice';

// const reducer = combineReducers({
//   completed: completedReducer,
//   actives: activesReducer,
// });

// const store = configureStore (
//   reducer,
//   applyMiddleware(thunk, logger)
// );

export const store = configureStore({
  reducer: {
    completed: completedReducer,
    actives: activesReducer,
  },
});


export default store;