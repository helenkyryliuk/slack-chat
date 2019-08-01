import React from 'react';
import connect from '../connect';
import { messagesSelector } from '../selectors';

const mapStateToProps = state => ({
  messageByChannel: messagesSelector(state),
});

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
