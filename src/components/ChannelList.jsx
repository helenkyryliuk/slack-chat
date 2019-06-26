import React from 'react';
import cn from 'classnames';
import {
  Tab, ListGroup, Col, Row, Card, Button, ButtonGroup,
} from 'react-bootstrap';
import connect from '../connect';
import MessageList from './MessageList';
import ModalAddChannel from './ModalAddChannel';
import MessageForm from './MessageForm';
import ChannelHeader from './ChannelHeader';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsState.allIds.map(channel => state.channelsState.byId[channel]),
    currentChannelId: state.currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelList extends React.Component {
  changeChannelId = id => () => {
    const { changeCurrentChannelId } = this.props;
    changeCurrentChannelId({ id });
  };

  handleRemoveChannel = id => () => {
    const { removeChannel } = this.props;
    removeChannel({ id });
  };

  render() {
    const {
      channels, currentChannelId,
    } = this.props;
    const classesForChannelName = id => ({
      'text-light': id === currentChannelId,
    });
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey={currentChannelId}>
        <Row>
          <Col sm={4}>
            <ListGroup>
              <div className="d-flex justify-content-between mb-2">
                <h4>Channels</h4>
                <ModalAddChannel />
              </div>
              {channels.map(({ id, name, removable }) => (
                <ListGroup.Item as="div" className="d-flex justify-content-between" key={id} action variant="info" onClick={this.changeChannelId(id)} eventKey={id}>
                  <Button variant="inherit" className={cn(classesForChannelName(id))}>{name}</Button>
                  <ButtonGroup>
                    {removable ? (
                      <ModalRemoveChannel />
                    ) : ''}
                    <ModalRenameChannel />
                  </ButtonGroup>
                </ListGroup.Item>
              ))}
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

export default ChannelList;
