import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import strings from '../../constants/Strings';
import { alert } from '../../utils/alert';
import { setUserData } from '../../utils/asyncStorage';
import MySpinner from '../../view/MySpinner';

export function loadUserData(token, onDoneFunc = () => {}) {
  return (dispatch, store) => {
    request
      .get(`${BASE_URL}get-profile`)
      .set('Authorization', token)
      .finish((err, res) => {
        if (err) {
          console.log('phat: loadUserData -> err', err);
        }
        if (!err && res.body && res.body.data) {
          dispatch({
            type: CONSTANTS_KEY.UPDATE_CURRENT_USER_DATA,
            payload: res.body.data,
          });
          setUserData({ userData: res.body.data });
          onDoneFunc();
        }
      });
  };
}
export function updateUserData(
  first_name,
  last_name,
  dob,
  phone_number,
  gender,
  address,
  onSuccessFunc = () => {},
  onFailFunc = () => {}
) {
  // console.log('dauphaiphat: updateUserData -> gender', gender);
  return (dispatch, store) => {
    request
      .post(`${BASE_URL}post-profile`)
      .set('Content-Type', 'application/json')
      .set('Authorization', store().user.token)
      .send({ first_name, last_name, dob, phone_number, gender, address })
      .finish((err, res) => {
        // console.log('dauphaiphat: updateUserData -> res', res);
        if (err) {
          console.log('phat: err', err);
          onFailFunc();
        }
        if (!err && res.body && res.body.status_code === 200) {
          onSuccessFunc();
        }
      });
  };
}
