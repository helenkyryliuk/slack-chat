const host = '';

export default {
  postMessage: id => [host, 'api/v1/channels', id, 'messages'].join('/'),
  requestChannel: () => [host, 'api/v1/channels'].join('/'),
  updateChannel: id => [host, 'api/v1/channels', id].join('/'),
};
