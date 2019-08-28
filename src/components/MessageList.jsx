import React from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { withTranslation } from 'react-i18next';
import { ListGroup } from 'react-bootstrap';
import connect from '../connect';
import { messagesSelector } from '../selectors';
import ScrollableContainer from './ScrollableContainer';


const mapStateToProps = state => ({
  messageByChannel: messagesSelector(state),
  messagesBoxBottomAlignState: state.messagesBoxBottomAlignState,
});
const style = {
  minHeight: '150px',
};

  @connect(mapStateToProps)
  @withTranslation()
class MessageList extends React.Component {
  handleScroll = (scrollStatus) => {
    const {
      messagesBoxBottomAlignState,
      setMessageBoxAlignToBottom,
      unsetMessageBoxAlignToBottom,
    } = this.props;
    const {
      offset: { y: offsetY },
      limit: { y: limitY },
    } = scrollStatus;

    if ((offsetY === limitY) && (messagesBoxBottomAlignState === 'off')) {
      setMessageBoxAlignToBottom();
    } else if ((offsetY !== limitY) && (messagesBoxBottomAlignState === 'on')) {
      unsetMessageBoxAlignToBottom();
    }
  };

  renderMessage = ({
    id, date, message, name,
  }) => (
    <ListGroup.Item key={id} className="message border-top">
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
    </ListGroup.Item>
  );

  render() {
    const { messageByChannel, messagesBoxBottomAlignState, t } = this.props;

    const noMessages = _.isEmpty(messageByChannel);

    const boxContent = noMessages
      ? <li className="text-center">{t('alert.channel-updated.channelIsEmpty')}</li>
      : _.map(messageByChannel, this.renderMessage);

    const classes = cn({
      'justify-content-center': noMessages,
      'messages-box': true,
    });
    return (
      <ScrollableContainer className="mb-4 border-gray border rounded" onScroll={this.handleScroll} alignToBottom={messagesBoxBottomAlignState === 'on'}>
        <ListGroup as="ul" variant="flush" className={classes} style={style}>
          {boxContent}
        </ListGroup>
      </ScrollableContainer>
    );
  }
  }

export default MessageList;
