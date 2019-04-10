import { combineReducers } from 'redux';
import AreaReducer from './reducers/areaReducer';
import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';
import EventPopularReducer from './reducers/eventPopularReducer';
import CategoryReducer from './reducers/CategoryReducer';
import UserReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: persistReducer(
    {
      key: 'User',
      storage: AsyncStorage
    },
    UserReducer
  ),
  eventPopular: persistReducer(
    {
      key: 'EventPopular',
      storage: AsyncStorage
    },
    EventPopularReducer
  ),
  categoryReducer: persistReducer(
    {
      key: 'CategoryReducer',
      storage: AsyncStorage
    },
    CategoryReducer
  )
});

export default reducer;
