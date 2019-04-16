import strings from '../../constants/Strings';
import { alert } from '../../utils/alert';
import request from '../../utils/request';
export const checkEmailExists = email =>
  new Promise((resolve, reject) => {
    request
      .get(`https://eticket-vhu.herokuapp.com/api/v1/auth/check-email-exists?email=${email}`)
      .finish((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
  });

// email register
export const registerPromise = (email, password, firstName, lastName, onDoneFunc = () => {}) =>
  new Promise((resolve, reject) => {
    request
      .post(`https://eticket-vhu.herokuapp.com/api/v1/auth/register`)
      .set('Content-Type', 'application/json')
      .send({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        role_slug: null,
        companyName: null,
        address: null,
        post_code: null,
        phone_number: null,
      })
      .finish((err, res) => {
        if (err) {
          reject(res ? res.body.message : strings.network_require_fail);
        } else if (res.body.status_code === 401) {
          alert(strings.alert, res.body.message);
          reject(res.body.message);
        } else {
          alert(strings.alert, res.body.message);
          onDoneFunc();
          resolve(res.body);
        }
      });
  });

// export function registerSuccess(res, self, onDoneFunc = () => {}) {
//   return (dispatch, store) => {
//     dispatch({
//       type: UPDATE_CURRENT_TOKEN,
//       payload: res.body.results.token,
//     });
//     dispatch({
//       type: UPDATE_CURRENT_USER_DATA,
//       payload: res.body.results.object,
//     });
//     setUserData({ token: res.body.results.token, userData: res.body.results.object });

//     getUserSettingsPublic(dispatch, store);
//     loadUserDataLoginSuccess(
//       () => {
//         alert(strings.congratulations, strings.register_success, () => {
//           self.setState({ isLoading: false });
//           onDoneFunc();
//           dispatch({
//             type: SET_LOGGED_IN,
//             payload: true,
//           });
//           firebase.messaging().subscribeToTopic(res.body.results.object.id);
//           MySpinner.hide();
//           setTimeout(() => {
//             self.props.navigation.navigate(ROUTE_KEY.CHOOSE_GENDER, {
//               userData: {
//                 ...res.body.results.object,
//                 nickname: res.body.results.object.nickname ? res.body.results.object.nickname.slice(0, 10) : '',
//               },
//             });
//           }, 100);
//         });
//       },
//       dispatch,
//       store
//     );
//   };
// }
