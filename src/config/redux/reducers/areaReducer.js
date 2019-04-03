import update from 'react-addons-update';
import { UPDATE_LIST_AREAS } from '../../../constants/Constants';

const initialState = {
  listAreas: []
};

const AreaReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LIST_AREAS:
      return update(state, {
        listAreas: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
};

export default AreaReducer;
