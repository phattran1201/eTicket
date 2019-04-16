import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { alert } from './alert';
import strings from '../constants/Strings';

export const getDeviceInfo = async () => {
  try {
    const deviceInfo = await AsyncStorage.getItem('@deviceInfo:key');
    return deviceInfo != null && JSON.parse(deviceInfo) != null ? JSON.parse(deviceInfo) : true;
  } catch (error) {
    return {
      device_token: '',
      device_type: '',
      device_language: '',
    };
  }
};

export const setUserToken = async token => {
  try {
    await AsyncStorage.setItem('@userToken:key', JSON.stringify(token));
  } catch (e) {
    alert('setUserToken', e);
  }
};
export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@userToken:key');
    return token != null && JSON.parse(token) != null ? JSON.parse(token) : true;
  } catch (error) {
    return {
      token: '',
    };
  }
};
export const setUserData = async userData => {
  try {
    await AsyncStorage.setItem('@userData:key', JSON.stringify(userData));
  } catch (e) {
    alert('setUserData', e);
  }
};
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('@userData:key');
    return userData != null && JSON.parse(userData) != null ? JSON.parse(userData) : true;
  } catch (error) {
    return {
      userData: {},
    };
  }
};
