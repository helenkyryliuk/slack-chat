import _ from "lodash";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { reducer as formReducer } from "redux-form";
import * as actions from "../actions";

const channels = (state = {}) => state;

const messagesFetchingState = handleActions(
  {
    [actions.fetchMessagesRequest]() {
      return "requested";
    },
    [actions.fetchMessagesSuccess]() {
      return "succeeded";
    },
    [actions.fetchMessagesFailure]() {
      return "failed";
    }
  },
  "none"
);

const messages = handleActions(
  {
    [actions.addMessageSuccess](
      state,
      {
        payload: { message }
      }
    ) {
      console.log(state);
      return state.concat(message);
    }
  },
  []
);

export default combineReducers({
  channels,
  messagesFetchingState,
  messages,
  form: formReducer
});
