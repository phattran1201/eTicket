import update from 'react-addons-update';
import { CONSTANTS_KEY } from '../../../constants/Constants';

const initialState = {
  currentLocation: {
    latitude: 10.7725451,
    longitude: 106.6980413,
  },
  token: '',
  userData: null,
  currentSettings: null,
  isLoggedIn: false,
  listTicket: [],
  listTicketEnd: [],
  listNotification: [],
  listFollow: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS_KEY.CLEAR_DATA: {
      return initialState;
    }
    // case CONSTANTS_KEY.UPDATE_CURRENT_LOCATION:
    //   return update(state, {
    //     currentLocation: {
    //       $set: action.payload,
    //     },
    //   });
    case CONSTANTS_KEY.SET_LOGGED_IN:
      return update(state, {
        isLoggedIn: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_CURRENT_USER_DATA:
      return update(state, {
        userData: {
          $set: action.payload,
        },
      });
    // case CONSTANTS_KEY.UPDATE_CURRENT_USER_IMAGE:
    //   return update(state, {
    //     userData: {
    //       ...state.userData,
    //       avatars: action.payload,
    //     },
    //   });
    case CONSTANTS_KEY.UPDATE_CURRENT_TOKEN:
      return update(state, {
        token: {
          $set: action.payload,
        },
      });
    // case CONSTANTS_KEY.UPDATE_USER_SETTINGS:
    //   return update(state, {
    //     currentSettings: {
    //       $set: action.payload,
    //     },
    //   });
    case CONSTANTS_KEY.RESET_LIST_NOTIFICATION:
      return update(state, {
        listNotification: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_NOTIFICATION:
      return update(state, {
        listNotification: {
          $set: [...state.listNotification, ...action.payload],
        },
      });
    case CONSTANTS_KEY.RESET_LIST_TICKET:
      return update(state, {
        listTicket: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_TICKET:
      return update(state, {
        listTicket: {
          $set: [...state.listTicket, ...action.payload],
        },
      });
    case CONSTANTS_KEY.RESET_LIST_TICKET_END:
      return update(state, {
        listTicketEnd: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_TICKET_END:
      return update(state, {
        listTicketEnd: {
          $set: [...state.listTicket, ...action.payload],
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_FOLLOW:
      return update(state, {
        listFollow: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_LIKE_CMT:
      return update(state, {
        listLikeCmt: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_SEARCH_FRIEND:
      return update(state, {
        listSearch: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
};

export default UserReducer;
