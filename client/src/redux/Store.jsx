import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './Index';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, logger)
);
export default store;
