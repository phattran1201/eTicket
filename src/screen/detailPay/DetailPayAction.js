import { BASE_URL, ROUTE_KEY } from '../../constants/Constants';
import strings from '../../constants/Strings';
import { alert } from '../../utils/alert';
import request from '../../utils/request';
import MySpinner from '../../view/MySpinner';

export const buyTicket = (token, event_id, type_id) =>
  new Promise((resolve, reject) => {
    request
      .post(`${BASE_URL}buy-ticket?event_id=${event_id}&type_id=${type_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({ event_id, type_id })
      .finish((err, res) => {
        if (err) {
          resolve(err);
        }
        if (!err && res.body && res.body.status_code === 401) {
          resolve(res.body);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.data);
        }
      });
  });
export const destroyTicket = (token, event_id) =>
  new Promise((resolve, reject) => {
    request
      .post(`${BASE_URL}destroy-ticket?ticketId=${event_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .send({ event_id })
      .finish((err, res) => {
        if (err) {
          resolve(err);
        }
        if (!err && res.body && res.body.status_code === 401) {
          resolve(res.body.message);
        }
        if (!err && res.body && res.body.status_code === 200) {
          resolve(res.body.message);
        }
      });
  });
