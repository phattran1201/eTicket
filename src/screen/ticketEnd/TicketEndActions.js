import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';

export function loadTicketEnd(page = 1, onDone = () => {}, onOutOfData = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-event-end-of-client?limit=10&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: loadTicketEnd -> err', err);
        }
        if (!err && res.body && res.body.data) {
          if (res.body.data.length === 0) onOutOfData();
          dispatch({
            type: CONSTANTS_KEY.UPDATE_LIST_TICKET_END,
            payload: res.body.data,
          });
        }
      });
  };
}
export function resetTicketEnd(page = 1, onDone = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-event-end-of-client?limit=10&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: resetTicketEnd -> err', err);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.RESET_LIST_TICKET_END,
            payload: res.body.data,
          });
        }
      });
  };
}
export const countTicketEnd = (page = 1, token) =>
  new Promise((resolve, reject) => {
    request
      .get(`${BASE_URL}get-event-end-of-client?limit=10&page=${page}`)
      .set('Authorization', token)
      .finish((err, res) => {
        if (err) {
          console.log('dauphaiphat: err', err);
          reject(err);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.paginator);
        }
      });
  });
