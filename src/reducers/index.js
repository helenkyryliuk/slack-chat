import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channels = (state = {}) => state;

const messages = handleActions(
  {
    [actions.addMessageSuccess](
      state,
      {
        payload: { message },
      },
    ) {
      return state.concat(message);
    },
  },
  [],
);

export default combineReducers({
  channels,
  messages,
  form: formReducer,
});