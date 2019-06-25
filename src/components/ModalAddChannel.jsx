import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import connect from '../connect';

const mapStateToProps = () => ({});
  @connect(mapStateToProps)

@reduxForm({
  form: 'AddNewChannel',
})
class ModalAddChannel extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        show: false,
      };
    }

    handleSubmit = async (value) => {
      const { addChannel, reset } = this.props;
      await addChannel({ name: value.name });
      reset();
      this.handleClose();
    };

    handleClose = () => {
      this.setState({ show: false });
    }

    handleShow = () => {
      this.setState({ show: true });
    }

    render() {
      const {
        handleSubmit, submitting, pristine,
      } = this.props;
      return (
        <>
          <Button variant="light" onClick={this.handleShow}>
            <FontAwesomeIcon
              icon={faPlus}
              className="text-info"
            />
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>New channel name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form
                action=""
                className="d-flex"
                onSubmit={handleSubmit(this.handleSubmit)}
              >
                <div className="input-group">
                  <Field
                    name="name"
                    disabled={submitting}
                    type="text"
                    className="form-control"
                    component="input"
                    required
                  />
                  <div className="input-group-append">
                    <Button
                      className="btn btn-info"
                      type="submit"
                      disabled={pristine || submitting}
                    >
                      {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Add channel'}
                    </Button>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }

export default ModalAddChannel;
