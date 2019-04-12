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
  storeInfo: null,
  storeMember: [],
  isLoggedIn: false,
  listFriend: [],
  listSuggestFriend: [],
  listFollowings: [],
  listLikeCmt: [],
  listSearch: {},
  alwaysAcceptInstantProduct: false,
  listSuggestFriendPages: 0,
  listSuggestFriendOutOfData: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS_KEY.CLEAR_DATA: {
      return initialState;
    }
    case CONSTANTS_KEY.UPDATE_CURRENT_LOCATION:
      return update(state, {
        currentLocation: {
          $set: action.payload,
        },
      });
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
    case CONSTANTS_KEY.UPDATE_CURRENT_USER_IMAGE:
      return update(state, {
        userData: {
          ...state.userData,
          avatars: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_CURRENT_TOKEN:
      return update(state, {
        token: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_USER_SETTINGS:
      return update(state, {
        currentSettings: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.LOAD_STORE_INFORMATION_FOR_USER:
      return update(state, {
        storeInfo: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_USER_TYPE:
      return update(state, {
        userData: {
          $set: {
            ...state.userData,
            user_type: action.payload,
          },
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_FRIEND:
      return update(state, {
        listFriend: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_SUGGEST_FRIEND:
      return update(state, {
        listSuggestFriend: {
          $set: [...state.listSuggestFriend, ...action.payload],
        },
        listSuggestFriendPages: {
          $set: state.listSuggestFriendPages + 1,
        },
      });
    case CONSTANTS_KEY.REPLACE_LIST_SUGGEST_FRIEND:
      return update(state, {
        listSuggestFriend: {
          $set: action.payload,
        },
      });
    case CONSTANTS_KEY.OUT_OF_DATA_LIST_SUGGEST_FRIEND:
      return update(state, {
        listSuggestFriendOutOfData: {
          $set: true,
        },
      });
    case CONSTANTS_KEY.REFRESH_LIST_SUGGEST_FRIEND:
      return update(state, {
        listSuggestFriend: {
          $set: action.payload,
        },
        listSuggestFriendPages: {
          $set: 1,
        },
        listSuggestFriendOutOfData: {
          $set: false,
        },
      });
    case CONSTANTS_KEY.UPDATE_LIST_FOLLOWINGS:
      return update(state, {
        listFollowings: {
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
    case CONSTANTS_KEY.CHANGE_ALWAYS_ACCEPT_INSTANT_PRODUCT:
      return update(state, {
        alwaysAcceptInstantProduct: {
          $set: true,
        },
      });
    case CONSTANTS_KEY.LOAD_STORE_MEMBER:
      return update(state, {
        storeMember: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
};

export default UserReducer;
