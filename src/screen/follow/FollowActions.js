import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';
import store from '../../config/redux/store';

export function getListFollowEvent(page = 1) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-event-of-client-follow?limit=99&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        if (err) {
          console.log('dauphaiphat: getListFollowEvent -> err', err);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.UPDATE_LIST_FOLLOW,
            payload: res.body.data,
          });
        }
      });
  };
}
export const followEvent = (token, event_id) =>
  new Promise((resolve, reject) => {
    request
      .post(`${BASE_URL}follow-event?event_id=${event_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({ event_id })
      .finish((err, res) => {
        if (err) {
          console.log('dauphaiphat: err', err);
          resolve(err);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.data);
        }
      });
  });
export const unfollowEvent = (token, event_id) =>
  new Promise((resolve, reject) => {
    request
      .post(`${BASE_URL}un-follow-event?event_id=${event_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({ event_id })
      .finish((err, res) => {
        if (err) {
          console.log('dauphaiphat: err', err);
          resolve(err);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.data);
        }
      });
  });
