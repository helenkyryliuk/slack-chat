import React from 'react';
import cn from 'classnames';
import {
  Button, ButtonGroup, ListGroup,
} from 'react-bootstrap';
import ModalRemoveChannel from './ModalRemoveChannel';
import ModalRenameChannel from './ModalRenameChannel';
import connect from '../connect';
import { channelsSelector, channelNameSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: channelsSelector(state),
    currentChannelId: state.currentChannelId,
    currentChannelName: channelNameSelector(state),
  };
  return props;
};

  @connect(mapStateToProps)
class ChannelList extends React.Component {
    changeChannelId = id => () => {
      const { changeCurrentChannelId } = this.props;
      changeCurrentChannelId({ id });
    };

    render() {
      const {
        channels, currentChannelId, currentChannelName,
      } = this.props;
      const classesForChannelName = id => ({
        'text-light': id === currentChannelId,
      });
      return (
        <>
          {channels.map(({ id, name, removable }) => (
            <ListGroup.Item as="div" className="d-flex justify-content-between" key={id} action variant="info" onClick={this.changeChannelId(id)} eventKey={id}>
              <Button variant="inherit" className={cn(classesForChannelName(id))}>{name}</Button>
              <ButtonGroup>
                {removable ? (
                  <ModalRemoveChannel />
                ) : ''}
                <ModalRenameChannel initialValues={{ name: currentChannelName }} />
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </>
      );
    }
  }

export default ChannelList;
