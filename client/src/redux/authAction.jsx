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
      console.log(body);
      console.log(config);
      const res = await axios.post('/api/users/signup', body, config);
      console.log(res);
      dispatch(
        setAlert('User Registerd Successfully. Please Login.', 'emerald', 50000)
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      // console.log(error.response);
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
