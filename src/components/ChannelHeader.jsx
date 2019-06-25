import React from 'react';
import connect from '../connect';

const mapStateToProps = ({ channels, currentChannelId }) => {
    const currentChannel = channels.filter(c => c.id === currentChannelId);
    const props = {
      channels, currentChannelId, currentChannel,
    };
    return props;
  };

  @connect(mapStateToProps)

class ChannelHeader extends React.Component {
    render() {
        const {
          currentChannel,
        } = this.props;
        console.log(currentChannel);
        return (
            <div>{currentChannel.map(({ name, id }) => <h3 key={id}>{name}</h3>)}</div>
        );
    }
  }

export default ChannelHeader;
