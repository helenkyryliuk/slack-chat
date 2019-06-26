import React from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const channels = state.channelsState.allIds.map(channel => state.channelsState.byId[channel]);
  const currentChannel = channels.filter(c => c.id === state.currentChannelId);
  const props = {
    currentChannelId: state.currentChannelId,
    currentChannel,
  };
  return props;
};

  @connect(mapStateToProps)

class ChannelHeader extends React.Component {
    render() {
      const {
        currentChannel,
      } = this.props;
      return (
        <div>{currentChannel.map(({ name, id }) => <h3 key={id}>{name}</h3>)}</div>
      );
    }
  }

export default ChannelHeader;
