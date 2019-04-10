import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { alert } from './alert';

export const getDeviceInfo = async () => {
  try {
    const deviceInfo = await AsyncStorage.getItem('@deviceInfo:key');
    return deviceInfo != null && JSON.parse(deviceInfo) != null ? JSON.parse(deviceInfo) : true;
  } catch (error) {
    return {
      device_token: 'token',
      device_type: '',
      device_language: ''
    };
  }
};
