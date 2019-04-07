import update from 'react-addons-update';
import { CLEAR_DATA, CONSTANTS_KEY } from '../../../constants/Constants';

const initialState = {
  listCategory: []
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_DATA: {
      return initialState;
    }
    case CONSTANTS_KEY.UPDATE_LIST_CATEGORY:
      return update(state, {
        listCategory: {
          $set: action.payload
        }
      });
    default:
      return state;
  }
};

export default CategoryReducer;
