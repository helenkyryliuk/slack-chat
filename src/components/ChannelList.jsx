import React from 'react';
import {
  Tab, ListGroup, Col, Row, Card, Button,
} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import UserNameContext from '../userNameContext';
import connect from '../connect';


const mapStateToProps = ({ channels, messages }) => {
  const props = { channels, messages };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'NewMessage',
})
class ChannelList extends React.Component {
  static contextType = UserNameContext;

  handleSubmit = async (values) => {
    const { addMessage, reset } = this.props;
    const task = { ...values, name: this.context };
    await addMessage({ task });
    reset();
  };

  render() {
    const {
      channels, handleSubmit, submitting, pristine, messages,
    } = this.props;
    return (
      <Tab.Container id="list-group-tabs-example" defaultActiveKey={1}>
        <Row>
          <Col sm={4}>
            <ListGroup>
              <div className="d-flex justify-content-between mb-2">
                <h4>Channels</h4>
              </div>


              {channels.map(({ id, name }) => (
                <ListGroup.Item key={id} action variant="info" href={id}>{name}</ListGroup.Item>
              ))}

            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey={1}>
                <Card className="text-left">
                  <Card.Header>General</Card.Header>
                  <Card.Body>
                    {messages.map(({
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
                      </div>))}
                  </Card.Body>
                  <Card.Footer className="text-muted">
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
                        />
                        <div className="input-group-append">
                          <Button
                            className="btn btn-info"
                            type="submit"
                            disabled={pristine || submitting}
                          >
                        Send
                          </Button>

                        </div>
                      </div>
                    </form>
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
