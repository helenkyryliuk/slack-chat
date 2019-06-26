import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};
  @connect(mapStateToProps)

class ModalRemoveChannel extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
      };
    }

    handleRemoveChannel = id => () => {
      const { removeChannel } = this.props;
      removeChannel({ id });
      this.handleClose();
    };

    handleClose = () => {
      this.setState({ show: false });
    }

    handleShow = () => {
      this.setState({ show: true });
    }

    render() {
      const { show } = this.state;
      const { currentChannelId } = this.props;
      return (
        <>
          <Button variant="inherit" onClick={this.handleShow}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              className="text-info"
            />
          </Button>
          <Modal show={show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>Are you sure you want to delete channel?</div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={this.handleRemoveChannel(currentChannelId)}
                className="btn btn-info"
              >
                Delete
              </Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default ModalRemoveChannel;
