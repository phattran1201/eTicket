import update from 'react-addons-update';
import { CONSTANTS_KEY } from '../../../constants/Constants';

const initialState = {
  listCategory: [],
};

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS_KEY.UPDATE_LIST_CATEGORY:
      return update(state, {
        listCategory: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
};

export default CategoryReducer;
