import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import strings from '../../constants/Strings';
import { alert } from '../../utils/alert';
import { setUserData } from '../../utils/asyncStorage';

export function loadUserData(token) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-profile`)
      .set('Authorization', token)
      .finish((err, res) => {
        if (err) {
          alert(strings.alert, res);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.UPDATE_CURRENT_USER_DATA,
            payload: res.body.data,
          });
          setUserData({ userData: res.body.data });
        }
      });
  };
}
export function updateUserData(first_name, last_name, dob, phone_number, gender, address, onSuccessFunc = () => {}) {
  return (dispatch, store) => {
    request
      .post(`${BASE_URL}post-profile`)
      .set('Content-Type', 'application/json')
      .set('Authorization', store().user.token)
      .send({ first_name, last_name, dob, phone_number, gender, address })
      .finish((err, res) => {
        console.log('dauphaiphat: updateUserData -> err', err);
        console.log('dauphaiphat: updateUserData -> res', res);
        if (err) {
          alert(strings.alert, 'Updated false');
        }
        if (!err && res.body && res.body.status_code === 200) {
          onSuccessFunc();
          alert(strings.alert, 'Updated successfully');
        }
      });
  };
}
