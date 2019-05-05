import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';

export function resetNotification(page = 1, onDone = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-notification-by-user-id?limit=200&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: resetNotification -> err', err);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.RESET_LIST_NOTIFICATION,
            payload: res.body.data,
          });
        }
      });
  };
}
export function getNotification(page = 1, onDone = () => {}, onOutOfData = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-notification-by-user-id?limit=200&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: getNotification -> err', err);
        }
        if (!err && res.body && res.body.data) {
          if (res.body.data.length === 0) onOutOfData();
          dispatch({
            type: CONSTANTS_KEY.UPDATE_LIST_NOTIFICATION,
            payload: res.body.data,
          });
        }
      });
  };
}
export const readNotification = (token, notificationId) =>
  new Promise((resolve, reject) => {
    request
      .post(`${BASE_URL}read-notification?notificationId=${notificationId}`)
      .set('Authorization', token)
      .finish((err, res) => {
        if (err) {
          console.log('dauphaiphat: err', err);
          reject(err);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.data);
        }
      });
  });
