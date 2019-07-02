import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Field, reduxForm } from 'redux-form';
import UserNameContext from '../userNameContext';
import connect from '../connect';

const mapStateToProps = ({ currentChannelId }) => {
  const props = {
    currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'NewMessage',
})
class MessageForm extends React.Component {
    static contextType = UserNameContext;

    constructor(props) {
      super(props);
      this.input = React.createRef();
    }

    componentDidMount() {
      this.input.current.getRenderedComponent().focus();
    }

    // componentDidUpdate() {
    //   this.input.current.getRenderedComponent().focus();
    // }

    handleSubmit = async (values) => {
      const { addMessage, reset, currentChannelId } = this.props;
      const message = { ...values, name: this.context, channelId: currentChannelId };
      await addMessage({ message });
      reset();
    };


    render() {
      const {
        handleSubmit, submitting, pristine,
      } = this.props;
      return (
        <form
          action=""
          className="d-flex"
          onSubmit={handleSubmit(this.handleSubmit)}
        >
          <div className="input-group">
            <Field
              name="message"
              disabled={submitting}
              type="text"
              className="form-control"
              component="input"
              required
              ref={this.input}
              forwardRef
            />
            <div className="input-group-append">
              <Button
                className="btn btn-info"
                type="submit"
                disabled={pristine || submitting}
              >
                {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Send'}
              </Button>
            </div>
          </div>
        </form>
      );
    }
}

export default MessageForm;
