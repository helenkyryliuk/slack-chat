import React from 'react';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

const style = {
  right: 0,
  left: 0,
  top: 0,
  bottom: 50,
};

const ChatContainer = () => (
  <div className="channel-view flex-grow-1 position-relative m-10">
    <div className="d-flex flex-column position-absolute" style={style}>
      <MessageList />
      <MessageForm />
    </div>
  </div>
);

export default ChatContainer;
