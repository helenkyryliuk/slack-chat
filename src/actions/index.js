import axios from 'axios';
import { createAction } from 'redux-actions';
import dateFormat from 'dateformat';
import routes from '../routes';

export const addMessageRequest = createAction('MESSAGE_ADD_REQUEST');
export const addMessageSuccess = createAction('MESSAGE_ADD_SUCCESS');
export const addMessageFailure = createAction('MESSAGE_ADD_FAILURE');

export const addMessage = ({ message: { message, name, channelId } }) => async (dispatch) => {
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
    await axios.post(routes.postMessage(channelId), { data });
  } catch (e) {
    dispatch(addMessageFailure());
  }
};

export const removeChannelRequest = createAction('CHANNEL_REMOVE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_REMOVE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_REMOVE_FAILURE');

export const removeChannel = channel => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    const url = routes.deleteChannel(channel.id);
    await axios.delete(url);
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};
export const changeCurrentChannelId = createAction('CURRENT_CHANNEL_ID_CHANGE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const addChannel = ({ name }) => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const url = routes.addChannel();
    const data = {
      attributes: {
        name,
      },
    };
    await axios.post(url, { data });
  } catch (e) {
    dispatch(removeChannelFailure());
    throw e;
  }
};

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
export const dismissNotification = createAction('NOTIFICATION_DISMISS');


export const renameChannel = ({ name }, id) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const url = routes.updateChannelName(id);
    const data = {
      attributes: {
        name,
      },
    };
    await axios.patch(url, { data });
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};
