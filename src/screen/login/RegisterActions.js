import DeviceInfo from 'react-native-device-info';
import {
    BASE_URL,
    UPDATE_CURRENT_TOKEN,
    UPDATE_CURRENT_USER_DATA,
    ROUTE_KEY,
    SET_LOGGED_IN
} from '../../constants/Constants';
import strings from '../../constants/Strings';
import firebase from 'react-native-firebase';
import { alert } from '../../utils/alert';
import request from '../../utils/request';
// import MySpinner from '../view/MySpinner';
// import md5 from 'react-native-md5';
// import { loginEmailPromise } from 'signin/SignInActions';
// import { setUserIdentity } from '../../utils/asyncStorage';


export const checkEmailExists = (email) =>
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
// export const registerPromise = (email, password) =>
//     new Promise((resolve, reject) => {
//         request
//             .post(`${BASE_URL}/auth/register_email`)
//             .set('Content-Type', 'application/json')
//             .send({
//                 email,
//                 password: md5.hex_md5(password),
//                 imei: DeviceInfo.getUniqueID(),
//             })
//             .finish((err, res) => {
//                 if (err) {
//                     reject(res ? res.body.message : strings.network_require_fail);
//                 } else {
//                     loginEmailPromise(email, password)
//                         .then(res2 => {
//                             resolve(res2);
//                         })
//                         .catch(err2 => {
//                             reject(strings.network_require_fail);
//                             //console.log('Hoang log err Email login', err2);
//                         });
//                 }
//             });
//     });

// export function registerSuccess(res, self, onDoneFunc = () => { }) {
//     return (dispatch, store) => {
//         dispatch({
//             type: UPDATE_CURRENT_TOKEN,
//             payload: res.body.results.token
//         });
//         dispatch({
//             type: UPDATE_CURRENT_USER_DATA,
//             payload: res.body.results.object
//         });
//         setUserIdentity({ token: res.body.results.token, userData: res.body.results.object });

//         getUserSettingsPublic(dispatch, store);
//         loadUserDataLoginSuccess(() => {
//             alert(strings.congratulations, strings.register_success, () => {
//                 self.setState({ isLoading: false });
//                 onDoneFunc();
//                 dispatch({
//                     type: SET_LOGGED_IN,
//                     payload: true
//                 });
//                 console.log('bambi login va chaun bi subscribe 2', res.body.results.object.id);
//                 firebase.messaging().subscribeToTopic(res.body.results.object.id);
//                 MySpinner.hide();
//                 setTimeout(() => {
//                     self.props.navigation.navigate(ROUTE_KEY.CHOOSE_GENDER, {
//                         userData: {
//                             ...res.body.results.object,
//                             nickname: res.body.results.object.nickname ? res.body.results.object.nickname.slice(0, 10) : ''
//                         }
//                     });
//                 }, 100);
//             });
//         }, dispatch, store);
//     };
// }
