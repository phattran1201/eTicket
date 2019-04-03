import { combineReducers } from 'redux';
import AreaReducer from './reducers/areaReducer';

const reducer = combineReducers({ area: AreaReducer });

export default reducer;
