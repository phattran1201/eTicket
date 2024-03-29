import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';

export function loadTicket(page = 1, onDone = () => {}, onOutOfData = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-my-ticket?limit=10&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: loadTicket -> err', err);
        }
        if (!err && res.body && res.body.data) {
          if (res.body.data.length === 0) onOutOfData();
          dispatch({
            type: CONSTANTS_KEY.UPDATE_LIST_TICKET,
            payload: res.body.data,
          });
        }
      });
  };
}
export function resetTicket(page, onDone = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-my-ticket?limit=10&page=${page}`)
      .set('Authorization', store().user.token)
      .finish((err, res) => {
        onDone();
        if (err) {
          console.log('phat: resetTicket -> err', err);
          // alert(strings.alert, err);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.RESET_LIST_TICKET,
            payload: res.body.data,
          });
        }
      });
  };
}
