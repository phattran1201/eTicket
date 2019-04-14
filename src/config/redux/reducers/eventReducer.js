import update from 'react-addons-update';
import { CONSTANTS_KEY } from '../../../constants/Constants';

const initialState = {
  listEventPopular: [],
  listEventInWeek: [],
  listEventFree: [],
};

const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS_KEY.UPDATE_LIST_POPUPAR_EVENTS:
      return update(state, {
        listEventPopular: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_IN_WEEK_EVENTS:
      return update(state, {
        listEventInWeek: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_FREE_EVENTS:
      return update(state, {
        listEventFree: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
};

export default EventReducer;
