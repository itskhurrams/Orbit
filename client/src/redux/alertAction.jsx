import { REMOVE_ALERT, SET_ALERT } from './actionTypes';
import { v4 } from 'uuid';
export const setAlert =
  (msg, alertType, timeout = 5000) =>
  (dispatch) => {
    const id = v4();
    dispatch({
      payload: { msg, alertType, id },
      type: SET_ALERT,
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
