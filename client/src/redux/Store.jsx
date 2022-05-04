import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Index';

const initialState = {};
const middleWare = [thunk];

const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleWare,
});
export default store;
