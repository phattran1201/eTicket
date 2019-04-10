import { CONSTANTS_KEY } from '../../constants/Constants';
import firebase from 'react-native-firebase';
import MySpinner from '../../view/MySpinner';


// export function loginSuccess(res, self, info = null, onDone = () => { }) {
//     return (dispatch, store) => {
//         dispatch({
//             type: CONSTANTS_KEY.UPDATE_CURRENT_TOKEN,
//             payload: res.body.results.token
//         });

//         dispatch({
//             type: CONSTANTS_KEY.UPDATE_CURRENT_USER_DATA,
//             payload: res.body.results.object
//         });
//         setUserIdentity({ token: res.body.results.token, userData: res.body.results.object });
//         getUserSettingsPublic(dispatch, store);
//         loadUserDataLoginSuccess(() => {
//             alert(strings.congratulations, strings.login_success, () => {
//                 self.setState({ isLoading: false });
//                 onDone();
//                 dispatch({
//                     type: CONSTANTS_KEY.SET_LOGGED_IN,
//                     payload: true
//                 });
//                 console.log('bambi login va chaun bi subscribe 2', res.body.results.object.id);
//                 firebase.messaging().subscribeToTopic(res.body.results.object.id);
//                 MySpinner.hide();
//             });
//         }, dispatch, store);
//     };
// }

// export function loginFail(err, self, onDone) {
//     if (err === 'cancel') {
//         onDone();
//         self.setState({ isLoading: false });
//     } else {
//         alert(strings.alert, err, () => {
//             onDone();
//             self.setState({ isLoading: false });
//         });
//     }
//     // onDone();
// }

// export const loginPromise = (email, password) =>
//     new Promise((resolve, reject) => {
//         request
//             .post(`${BASE_URL}${AUTH_API}/login_email`)
//             .set('Content-Type', 'application/json')
//             .send({
//                 email,
//                 password: md5.hex_md5(password)
//             })
//             .finish((err, res) => {
//                 if (err) {
//                     reject(res && res.body ? res.body.message : strings.network_require_fail);
//                     // onDone();
//                 } else {
//                     resolve(res);
//                 }
//             });
//     });

// export const loginEmailPromise = (email, password) =>
//     new Promise((resolve, reject) => {
//         request
//             .post(`${BASE_URL}/auth/login_email`)
//             .set('Content-Type', 'application/json')
//             .send({
//                 email,
//                 password: md5.hex_md5(password)
//             })
//             .finish((err, res) => {
//                 if (err) {
//                     reject(strings.network_require_fail);
//                     //console.log('Hoang log', err);
//                     alert(strings.alert);
//                 } else {
//                     resolve(res);
//                 }
//             });
//     });
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const loginWithPhone = onDone => new Promise((resolve, reject) => {
//     console.log('poi flow login loginWithPhone');
//     RNAccountKit.configure({
//         initialPhoneCountryPrefix: VIETNAM_MOBILE_PHONE_PREFIX,
//         initialPhoneNumber: '',
//         theme: accountKitThemeForIOS
//     });
//     console.log('poi flow login RNAccountKit.configure');
//     // onDone();
//     RNAccountKit.loginWithPhone().then(token => {
//         console.log('poi flow login RNAccountKit.loginWithPhone token:', token);
//         if (!token) {
//             console.log('Login cancelled');
//             reject('cancel');
//         } else {
//             // console.log(`Logged with phone. Token: ${token}`);
//             //login to our sever
//             // onDone();
//             loginWithPhonePromise(token)
//                 .then(res => {
//                     console.log('poi flow login loginWithPhonePromise then:', res);
//                     resolve(res);
//                 })
//                 .catch(err => {
//                     console.log('poi flow login loginWithPhonePromise catch:', err);
//                     reject(
//                         err && err.body && err.body.message
//                             ? err.body.message
//                             : strings.network_require_fail
//                     );
//                 });
//         }
//     })
//         .catch(err => {
//             console.log('poi flow login RNAccountKit.loginWithPhone catch:', err);
//             reject(err);
//         });
// });

// export const loginWithPhonePromise = token =>
//     new Promise((resolve, reject) => {
//         console.log('poi flow login loginWithPhonePromise token ', token);
//         request
//             .post(`${BASE_URL_FBS}/${AUTH_API}/exchange`)
//             .set('Content-Type', 'application/json')
//             .send({
//                 provider: 'account_kit',
//                 accessToken: token.token
//             })
//             .finish((err, res) => {
//                 console.log('poi flow login loginWithPhonePromise', res);
//                 if (err) {
//                     reject(res);
//                 } else {
//                     resolve(res);
//                 }
//             });
//     });

// export const loginWithFacebookAccountKit = () =>
//     new Promise((resolve, reject) => {
//         RNAccountKit.configure({
//             initialPhoneCountryPrefix: VIETNAM_MOBILE_PHONE_PREFIX,
//             initialPhoneNumber: '',
//             theme: accountKitThemeForIOS
//         });
//         LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSION).then(
//             result => {
//                 if (result.isCancelled) {
//                     reject('cancel');
//                 } else {
//                     AccessToken.getCurrentAccessToken()
//                         .then(data => {
//                             const responseInfoCallback = (error, result2) => {
//                                 if (error) {
//                                     reject(strings.login_fail);
//                                 } else {
//                                     loginPromise(
//                                         result2.id,
//                                         PASSWORD_FOR_USER_LOGIN_WITH_FACEBOOK
//                                     )
//                                         .then(res => resolve({ res, info: null }))
//                                         .catch(err => {
//                                             setTimeout(() => {
//                                                 RNAccountKit.loginWithPhone()
//                                                     .then(token => {
//                                                         if (!token) {
//                                                             reject(strings.login_fail);
//                                                         } else {
//                                                             RNAccountKit.getCurrentAccount()
//                                                                 .then(account =>
//                                                                     registerPromise(
//                                                                         result2.id,
//                                                                         PASSWORD_FOR_USER_LOGIN_WITH_FACEBOOK,
//                                                                         `(+${account.phoneNumber.countryCode})${
//                                                                         account.phoneNumber.number
//                                                                         }`
//                                                                     )
//                                                                 )
//                                                                 .then(() =>
//                                                                     loginPromise(
//                                                                         result2.id,
//                                                                         PASSWORD_FOR_USER_LOGIN_WITH_FACEBOOK
//                                                                     )
//                                                                 )
//                                                                 .then(res => resolve({ res, info: result2 }))
//                                                                 .catch(err => reject(strings.login_fail));
//                                                         }
//                                                     })
//                                                     .catch(err => reject('cancel'));
//                                             });
//                                         });
//                                 }
//                             };
//                             const infoRequest = new GraphRequest(
//                                 '/me',
//                                 {
//                                     accessToken: data.accessToken,
//                                     parameters: {
//                                         fields: {
//                                             string: 'email,name'
//                                         }
//                                     }
//                                 },
//                                 responseInfoCallback
//                             );
//                             new GraphRequestManager().addRequest(infoRequest).start();
//                         })
//                         .catch(() => {
//                             reject(strings.login_fail);
//                         });
//                 }
//             },
//             () => {
//                 reject(strings.login_fail);
//             }
//         );
//     });

// export const loginWithFacebookSDK = self =>
//     new Promise(resolve => {
//         LoginManager.logInWithReadPermissions(FACEBOOK_PERMISSION).then(
//             result => {
//                 if (result.isCancelled) {
//                     console.log('hinodi loginWithFacebookSDK cancel');
//                 } else {
//                     AccessToken.getCurrentAccessToken()
//                         .then(data =>
//                             request
//                                 .post(`${BASE_URL}${AUTH_API}/login_with_facebook`)
//                                 .send({ facebookToken: data.accessToken })
//                                 .finish((err, res) => {
//                                     if (!err && res && res.body && res.body.results) {
//                                         if (res.body.results.isNewUser) {
//                                             self.props.registerSuccess(res, self);
//                                         } else {
//                                             self.props.loginSuccess(res, self);
//                                         }
//                                     } else {
//                                         console.log('hinodi loginWithFacebookSDK error 3', err);
//                                         alert(strings.alert, strings.login_fail);
//                                     }
//                                 })
//                         )
//                         .catch(error2 => {
//                             console.log('hinodi loginWithFacebookSDK error 2', error2);
//                             alert(strings.alert, strings.login_fail);
//                         });
//                 }
//             },
//             error => {
//                 console.log('hinodi loginWithFacebookSDK error 1', error);
//                 alert(strings.alert, strings.login_fail);
//             }
//         );
//     });

// export const loginWithGoogleSDK = self =>
//     new Promise(async resolve => {
//         try {
//             await GoogleSignin.configure({
//                 iosClientId:
//                     '434659415477-8goq0p4i1884a0os7k1h7kvbo259suks.apps.googleusercontent.com' // only for iOS
//             });
//             await GoogleSignin.hasPlayServices();
//             const userInfo = await GoogleSignin.signIn();
//             request
//                 .post(`${BASE_URL}${AUTH_API}/login_with_google`)
//                 .send({ googleToken: userInfo.accessToken })
//                 .finish((err, res) => {
//                     if (!err && res && res.body && res.body.results) {
//                         if (res.body.results.isNewUser) {
//                             self.props.registerSuccess(res, self);
//                         } else {
//                             self.props.loginSuccess(res, self);
//                         }
//                     } else {
//                         console.log('hinodi loginWithGoogleSDK error 1', err);
//                         alert(strings.alert, strings.login_fail);
//                     }
//                 });
//         } catch (error) {
//             alert(strings.alert, strings.login_fail);
//             console.log('hinodi error', error);
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//                 // user cancelled the login flow
//                 console.log('hinodi user cancelled the login flow');
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//                 // operation (f.e. sign in) is in progress already
//                 console.log('hinodi operation (f.e. sign in) is in progress already');
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//                 // play services not available or outdated
//                 console.log('hinodi play services not available or outdated');
//             } else {
//                 // some other error happened
//                 console.log('hinodi some other error happened');
//             }
//         }
//     });

// export const loginWithKaKaoSDK = self =>
//     new Promise(async resolve => {
//         RNKakaoLogins.login((err, result) => {
//             if (err) {
//                 console.log('hinodi loginWithKaKaoSDK error', err);
//                 alert(strings.alert, strings.login_fail);
//             } else {
//                 request
//                     .post(`${BASE_URL}${AUTH_API}/login_with_kakaotalk`)
//                     .send({ kakaotalkToken: result.token })
//                     .finish((err2, res) => {
//                         if (!err2 && res && res.body && res.body.results) {
//                             if (res.body.results.isNewUser) {
//                                 self.props.registerSuccess(res, self);
//                             } else {
//                                 self.props.loginSuccess(res, self);
//                             }
//                         } else {
//                             console.log('hinodi loginWithKaKaoSDK error 1', err2, res);
//                             alert(strings.alert, strings.login_fail);
//                         }
//                     });
//             }
//         });
//     });
