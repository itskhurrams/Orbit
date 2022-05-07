import { SET_ALERT } from './actiontypes';
import { v4 } from 'uuid';
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = v4();
  dispatch({
    payload: { msg, alertType, id },
    type: SET_ALERT,
  });
};
