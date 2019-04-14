import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';

export function loadListPopularEvents(page = 1) {
  return (dispatch, store) => {
    request.get(`${BASE_URL}get-event?limit=10&page=${page}`).finish((err, res) => {
      if (!err && res && res.body && res.body.data) {
        dispatch({
          type: CONSTANTS_KEY.UPDATE_LIST_POPUPAR_EVENTS,
          payload: res.body.data,
        });
      }
    });
  };
}
export function loadListInWeekEvents(page = 1) {
  return (dispatch, store) => {
    request.get(`${BASE_URL}get-event-in-week?limit=10&page=${page}`).finish((err, res) => {
      if (!err && res && res.body && res.body.data) {
        dispatch({
          type: CONSTANTS_KEY.UPDATE_LIST_IN_WEEK_EVENTS,
          payload: res.body.data,
        });
      }
    });
  };
}

export function loadListFreeEvents(page = 1) {
  return (dispatch, store) => {
    request.get(`${BASE_URL}get-event-free?limit=10&page=${page}`).finish((err, res) => {
      if (!err && res && res.body && res.body.data) {
        dispatch({
          type: CONSTANTS_KEY.UPDATE_LIST_FREE_EVENTS,
          payload: res.body.data,
        });
      }
    });
  };
}
