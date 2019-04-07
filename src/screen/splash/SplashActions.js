import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';

export function loadListCategory(onOutOfData = () => {}) {
  return (dispatch, store) => {
    request.get(`${BASE_URL}get-categories`).finish((err, res) => {
      if (!err && res && res.body && res.body.data) {
        if (res.body.data.length === 0) onOutOfData();
        dispatch({
          type: CONSTANTS_KEY.UPDATE_LIST_CATEGORY,
          payload: res.body.data
        });
      }
    });
  };
}
