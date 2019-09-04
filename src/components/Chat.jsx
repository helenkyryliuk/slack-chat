import React from 'react';
import {
  Tab, ListGroup, Col,
} from 'react-bootstrap';
import { Alert, AlertContainer } from 'react-bs-notifier';
import { withTranslation } from 'react-i18next';
import connect from '../connect';
import ModalAddChannel from './ModalAddChannel';
import ChannelList from './ChannelList';
import { channelsSelector } from '../selectors';
import ChatContainer from './ChatContainer';

const style = {
  'min-height': '700px',
};

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.currentChannelId,
    notification: state.notification,
  };
  return props;
};


@connect(mapStateToProps)
@withTranslation()
class Chat extends React.Component {
  renderAlert() {
    const { notification, dismissNotification, t } = this.props;
    if (!notification) {
      return null;
    }
    return (
      <div>
        <AlertContainer>
          <Alert
            timeout={1000}
            onDismiss={dismissNotification}
            type={notification.type}
            headline={t(notification.headline)}
          >
            {t(notification.message)}
          </Alert>
        </AlertContainer>
      </div>
    );
  }

  render() {
    const {
      currentChannelId,
    } = this.props;
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey={currentChannelId}>
        <main className="h-100 d-flex flex-column flex-md-row" style={style}>
          {this.renderAlert()}
          <Col as="aside" md={4} className="px-0 mr-md-3 mb-2 mb-md-0 d-flex flex-column">
            <ListGroup>
              <div className="d-flex justify-content-between mb-2">
                <h4>Channels</h4>
                <ModalAddChannel />
              </div>
              <ChannelList />
            </ListGroup>
          </Col>
          <Col xs={11} md={8} as="section" className="d-flex flex-column flex-grow-1 px-0 ml-md-3 mw-100">
            <ChatContainer />
          </Col>
        </main>
      </Tab.Container>
    );
  }
}

export default Chat;
