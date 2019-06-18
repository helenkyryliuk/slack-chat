import axios from 'axios';
import { createAction } from 'redux-actions';
import dateFormat from 'dateformat';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ task: { message, name } }) => async (dispatch) => {
  dispatch(addMessageRequest());
  try {
    const time = new Date();
    const formattedTime = dateFormat(time, 'h:MM TT');
    const data = {
      attributes: {
        message,
        name,
        date: formattedTime,
      },
    };
    await axios.post(routes.postMessage(1), { data });
  } catch (e) {
    dispatch(addMessageFailure());
  }
};
