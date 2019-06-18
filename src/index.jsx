import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import faker from 'faker';
import cookies from 'js-cookie';
import io from 'socket.io-client';
import reducers from './reducers';
import App from './components/App';
import { addMessageSuccess } from './actions';
import UserNameContext from './userNameContext';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const init = ({ channels, messages }) => ({ channels, messages });
const store = createStore(
  reducers,
  { ...init(gon) },
  compose(
    applyMiddleware(thunk),
  ),
);

if (!cookies.get('name')) {
  const userName = faker.name.findName();
  cookies.set('name', userName);
}
const userName = cookies.get('name');

render(
  <Provider store={store}>
    <UserNameContext.Provider value={userName}>
      <App />
    </UserNameContext.Provider>
  </Provider>,
  document.getElementById('chat'),
);

const socket = io();
socket.on('newMessage', ({ data: { attributes } }) => {
  store.dispatch(addMessageSuccess({ message: attributes }));
});
