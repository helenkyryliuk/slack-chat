import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
// import gon from 'gon';
import React from 'react';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import reducers from './reducers'
// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const init = ({ channels }) => (
  { channels }
);

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  { ...init(gon) },
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    /* eslint-enable */
  ),
  );

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
