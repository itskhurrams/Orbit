import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './actionTypes';
import { setAlert } from './alertAction';

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
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((element) => dispatch(setAlert(element.msg, 'red')));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
