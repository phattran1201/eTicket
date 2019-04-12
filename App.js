/* eslint-disable max-line-length */
/* eslint-disable import/imports-first */
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/config/redux/store';
import { MenuProvider } from 'react-native-popup-menu';
import MyComponent from './src/view/MyComponent';
import AppNavigator from './src/config/AppNavigator';
import { getUserIdentity } from './src/utils/asyncStorage';
import { CONSTANTS_KEY } from './src/constants/Constants';

export default class App extends MyComponent {
  // componentDidMount() {
  //   async updateUserIndentityFromAsyncStorageToRedux() {
  //     const userIdentity = await getUserIdentity();
  //     store.dispatch({
  //       type: CONSTANTS_KEY.UPDATE_CURRENT_TOKEN,
  //       payload: userIdentity.token,
  //     });
  //     store.dispatch({
  //       type: CONSTANTS_KEY.UPDATE_CURRENT_USER_DATA,
  //       payload: userIdentity.userData,
  //     });
  //   }
  // }

  render() {
    return (
      <Provider store={store}>
        <MenuProvider style={{ flex: 1 }}>
          <AppNavigator />
        </MenuProvider>
      </Provider>
    );
  }
}
