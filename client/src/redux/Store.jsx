import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initialState = {};
const middleWare = [thunk];

const store = configureStore({
  rootReducer,
  initialState,
  middleWare,
});
export default store;
