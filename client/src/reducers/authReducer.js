import {
  FETCH_USER,
  ERROR
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case ERROR:
      return action.payload || ERROR;
    default:
      return state;
  }
}
