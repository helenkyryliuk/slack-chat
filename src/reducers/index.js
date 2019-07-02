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
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'finished';
  },
}, 'none');

const notification = handleActions({
  [actions.renameChannelSuccess]() {
    return {
      type: 'success',
      headline: 'alert.channel-updated.headline',
      message: 'alert.channel-updated.message',
    };
  },
  [actions.addChannelSuccess]() {
    return {
      type: 'success',
      headline: 'alert.channel-added.headline',
      message: 'alert.channel-added.message',
    };
  },
  [actions.removeChannelSuccess]() {
    return {
      type: 'success',
      headline: 'alert.channel-removed.headline',
      message: 'alert.channel-removed.message',
    };
  },
  [actions.addChannelFailure]: (_state, { payload }) => {
    let message;
    switch (payload.code) {
      case 404:
        message = 'alert.channel-add-failure.forbidden';
        break;
      default:
        message = 'alert.channel-add-failure.message';
        break;
    }
    const msg = { type: 'danger', headline: 'alert.channel-add-failure.headline', message };
    return msg;
  },
  [actions.removeChannelFailure]: (_state, { payload }) => {
    let message;
    switch (payload.code) {
      case 404:
        message = 'alert.channel-remove-failure.forbidden';
        break;
      default:
        message = 'alert.channel-remove-failure.message';
        break;
    }
    const msg = { type: 'danger', headline: 'alert.channel-remove-failure.headline', message };
    return msg;
  },
  [actions.renameChannelFailure]: (_state, { payload }) => {
    let message;
    switch (payload.code) {
      case 404:
        message = 'alert.channel-rename-failure.forbidden';
        break;
      default:
        message = 'alert.channel-rename-failure.message';
        break;
    }
    const msg = { type: 'danger', headline: 'alert.channel-rename-failure.headline', message };
    return msg;
  },
  [actions.dismissNotification]() {
    const info = null;
    return info;
  },
}, null);

export default combineReducers({
  channelsState,
  messages,
  channelRemovingState,
  channelAddingState,
  channelRenamingState,
  currentChannelId,
  notification,
  form: formReducer,
});
