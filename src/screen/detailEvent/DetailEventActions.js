import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';

export function loadListPopularEvents(page = 1, onOutOfData = () => {}) {
  return (dispatch, store) => {
    request.get(`${BASE_URL}get-event?limit=10&page=${page}`).finish((err, res) => {
      if (!err && res && res.body && res.body.data) {
        if (res.body.data.length === 0) onOutOfData();
        console.log('load ne');

        dispatch({
          type: CONSTANTS_KEY.UPDATE_LIST_POPUPAR_EVENTS,
          payload: res.body.data
        });
      }
    });
  };
}