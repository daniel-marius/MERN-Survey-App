import mapKeys from 'lodash/mapKeys';
import {
  FETCH_SURVEYS,
  FETCH_SURVEY,
  ERROR
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_SURVEY:
      const survey = action.payload;
      return { ...state, [survey._id]: survey };
    case FETCH_SURVEYS:
      return { ...state, ...mapKeys(action.payload, '_id') };
    case ERROR:
      return action.payload || ERROR;
    default:
      return state;
  }
}
