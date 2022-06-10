import axios from 'axios';
import setAuthToken from '../helpers/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from './actionTypes';
import { setAlert } from './alertAction';

export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:5000',
    };
    const res = await axios.get('/api/auth', config);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};

export const login = (email, passcode) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: 'http://localhost:5000',
  };
  const body = JSON.stringify({
    email,
    passcode,
  });
  try {
    const res = await axios.post('/api/users/login', body, config);
    dispatch(setAlert('Login Successfully.', 'emerald', 50000));
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // const errors = error.response.data.errors;
    if (error.response.data) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
      dispatch(setAlert(error.response.data, 'red'));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const signUp =
  (firstName, lastName, title, email, passcode, location, isCompany) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: 'http://localhost:5000',
    };
    const newUser = {
      firstName,
      lastName,
      title,
      email,
      passcode,
      location,
      isCompany,
    };
    const body = JSON.stringify(newUser);
    try {
      const res = await axios.post('/api/users/signup', body, config);
      dispatch(
        setAlert('User Registerd Successfully. Please Login.', 'emerald', 50000)
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      // const errors = error.response.data.errors;
      if (error.response.data) {
        // errors.forEach((error) => dispatch(setAlert(error.msg, 'red')));
        dispatch(setAlert(error.response.data, 'red'));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
