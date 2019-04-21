import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels }) => {
  const props = { channels };
  return props;
};

class App extends React.Component {
render() {
  const { channels } = this.props;
  return (
    <div className="col-5">
       <div className="mt-3">
        <ul className="list-group">
          {channels.map(({ id, name }) => (
            <li key={id} className="list-group-item d-flex">
              <span className="mr-auto">{name}</span>
              <button type="button" className="close">
                <span>&times;</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
}

export default connect(mapStateToProps)(App);
