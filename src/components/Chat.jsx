import React from 'react';
import {
  Tab, ListGroup, Col, Row, Card,
} from 'react-bootstrap';
import { Alert, AlertContainer } from 'react-bs-notifier';
import { withTranslation } from 'react-i18next';
import connect from '../connect';
import MessageList from './MessageList';
import ModalAddChannel from './ModalAddChannel';
import MessageForm from './MessageForm';
import ChannelList from './ChannelList';
import ChannelHeader from './ChannelHeader';


const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsState.allIds.map(channel => state.channelsState.byId[channel]),
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
            timeout={3000}
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
        <Row>
          {this.renderAlert()}
          <Col sm={4}>
            <ListGroup>
              <div className="d-flex justify-content-between mb-2">
                <h4>Channels</h4>
                <ModalAddChannel />
              </div>
              <ChannelList />
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey={currentChannelId}>
                <Card className="text-left">
                  <Card.Header><ChannelHeader /></Card.Header>
                  <Card.Body>
                    <MessageList />
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    <MessageForm />
                  </Card.Footer>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Chat;
