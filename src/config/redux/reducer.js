import { combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import EventReducer from './reducers/eventReducer';
import CategoryReducer from './reducers/categoryReducer';
import UserReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: persistReducer(
    {
      key: 'User',
      storage: AsyncStorage,
    },
    UserReducer
  ),
  event: persistReducer(
    {
      key: 'Event',
      storage: AsyncStorage,
    },
    EventReducer
  ),
  categoryReducer: persistReducer(
    {
      key: 'CategoryReducer',
      storage: AsyncStorage,
    },
    CategoryReducer
  ),
});

export default reducer;
