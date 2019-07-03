import React from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const messageByChannel = state.messages.filter(m => m.channelId === state.currentChannelId);
  const props = {
    currentChannelId: state.currentChannelId, messageByChannel,
  };
  return props;
};

  @connect(mapStateToProps)
class MessageList extends React.Component {
    render() {
      const { messageByChannel } = this.props;
      return (
        <div>
          {messageByChannel.map(({
            id, date, message, name,
          }) => (
            <div key={id}>
              <p className="user-name font-weight-bold mb-0 text-info">
                {name}
                {' '}
                <span className="timestamp text-muted font-weight-light">
                  <small>
                    {date}
                  </small>
                </span>
              </p>
              <p className="message">{message}</p>
            </div>
          ))}
        </div>
      );
    }
  }

export default MessageList;
