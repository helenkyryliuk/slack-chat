import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channelsState = handleActions(
  {
    [actions.addChannelSuccess](
      state,
      {
        payload: { channel },
      },
    ) {
      const { byId, allIds } = state;
      return {
        byId: { ...byId, [channel.id]: channel },
        allIds: [...allIds, channel.id],
      };
    },
    [actions.removeChannelSuccess](
      state,
      {
        payload: { id },
      },
    ) {
      const { byId, allIds } = state;
      return {
        byId: _.omit(byId, id),
        allIds: _.without(allIds, id),
      };
    },
    [actions.renameChannelSuccess](
      state,
      {
        payload: { channel },
      },
    ) {
      const { byId, allIds } = state;
      return {
        byId: _.set(byId, [channel.id, 'name'], channel.name),
        allIds,
      };
    },
  },
  { byId: {}, allIds: [] },
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

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
}, 'none');

export default combineReducers({
  channelsState,
  messages,
  channelRemovingState,
  channelAddingState,
  channelRenamingState,
  currentChannelId,
  form: formReducer,
});
