import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actionCreators from "../actions";
import { UserNameContext } from '../userNameContext';


const mapStateToProps = ({ channels, messages }) => {
  const props = { channels, messages };
  return props;
};

@connect(mapStateToProps, actionCreators)
class ChannelList extends React.Component {
  static contextType = UserNameContext;

  handleSubmit = async values => {
    const { addMessage, reset } = this.props;
    const task = { ...values, name: this.context };
    console.log({task});
    await addMessage({ task });
    reset();
  };
  render() {
    const { channels, handleSubmit, submitting, pristine, messages } = this.props;
    return (
      <div className="row">
        <div className="col-4">
          <div className="d-flex justify-content-between mb-2">
            <h4>Channels</h4>
          </div>
          <div className="list-group" id="list-tab" role="tablist">
            {channels.map(({ id, name }) => (
              <a
                key={id}
                className="list-group-item list-group-item-action active"
                id="list-home-list"
                data-toggle="list"
                href="#list-home"
                role="tab"
                aria-controls="home"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
        <div className="col-8">
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="list-home"
              role="tabpanel"
              aria-labelledby="list-home-list"
            >
              <div className="card text-center">
                <div className="card-header text-left">General</div>
                <div className="card-body text-left">
                  {messages.map(({id, date, message, name}) => <div key={id}><p className="user-name font-weight-bold mb-0 text-info">{name} <span className="timestamp text-muted font-weight-light"><small>{date}</small></span></p><p className="message">{message}</p></div>)}
                </div>
                <div className="card-footer text-muted">
                  <form
                    action=""
                    className="d-flex"
                    onSubmit={handleSubmit(this.handleSubmit)}
                  >
                    <Field
                      name="message"
                      disabled={submitting}
                      type="text"
                      className="form-control"
                      component="input"
                      required
                    />
                    <div className="input-group-prepend">
                      <input
                        className="btn btn-success"
                        type="submit"
                        disabled={pristine || submitting}
                        value="Send"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connectedChannelList = connect(
  mapStateToProps,
  actionCreators
)(ChannelList);
export default reduxForm({
  form: "NewMessage"
})(connectedChannelList);
