import { createSelector } from 'reselect';
import _ from 'lodash';

export const getChannelsById = state => state.channelsState.byId;
export const getChannelsIds = state => state.channelsState.allIds;
const getMessages = state => state.messages;
const getCurrentChannelId = state => state.currentChannelId;

export const messagesSelector = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, id) => messages.filter(el => el.channelId === id),
);

export const channelsSelector = createSelector(
  [getChannelsById, getChannelsIds],
  (byId, allIds) => allIds.map(id => byId[id]),
);

export const channelNameSelector = createSelector(
  [getChannelsById, getCurrentChannelId],
  (byId, currentChannelId) => _.get(byId, [currentChannelId, 'name'], ''),
);

export const currentChannelSelector = createSelector(
  [channelsSelector, getCurrentChannelId],
  (channels, currentChannelId) => channels.filter(c => c.id === currentChannelId),
);
