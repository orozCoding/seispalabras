import { combineReducers, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import activesReducer from './actives/activesReducer';
import completedReducer from './completed/completedReducer';

const reducer = combineReducers({
  completed: completedReducer,
  actives: activesReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(logger, thunk)
);

export default store;