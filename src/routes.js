const host = '';

export default {
  postMessage: id => [host, 'api/v1/channels', id, 'messages'].join('/'),
  getChannelList: () => [host, 'api/v1/channels'].join('/'),
  getChannelData: id => [host, 'api/v1/channels', id].join('/'),
};