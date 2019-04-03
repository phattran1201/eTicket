/* eslint-disable max-line-length */
/* eslint-disable import/imports-first */
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/config/redux/store';
import { MenuProvider } from 'react-native-popup-menu';
import MyComponent from './src/view/MyComponent';
import AppNavigator from './src/config/AppNavigator';

export default class App extends MyComponent {
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
