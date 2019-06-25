import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = handleActions(
  {
    [actions.addChannelSuccess](
      state,
      {
        payload: { channel },
      },
    ) {
      return state.concat(channel);
    },
    [actions.removeChannelSuccess](
      state,
      {
        payload: { id },
      },
    ) {
      return state.filter(c => c.id !== id);
    },
  },
  [],
);

const currentChannelId = handleActions(
  {
    [actions.changeCurrentChannelId](
      state,
      {
        payload: { id },
      },
    ) {
      return id;
    },
  },
  null,
);

const messages = handleActions(
  {
    [actions.addMessageSuccess](
      state,
      {
        payload: { message },
      },
    ) {
      return state.concat(message);
    },
  },
  [],
);

const channelRemovingState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelFailure]() {
    return 'failed';
  },
  [actions.removeChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
}, 'none');

export default combineReducers({
  channels,
  messages,
  channelRemovingState,
  channelAddingState,
  currentChannelId,
  form: formReducer,
});
