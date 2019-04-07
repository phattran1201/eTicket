import update from 'react-addons-update';
import { CLEAR_DATA, CONSTANTS_KEY } from '../../../constants/Constants';

const initialState = {
  listEventPopular: []
};

const EventPopularReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DATA: {
      return initialState;
    }
    case CONSTANTS_KEY.UPDATE_LIST_POPUPAR_EVENTS:
      return update(state, {
        listEventPopular: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
};

export default EventPopularReducer;
