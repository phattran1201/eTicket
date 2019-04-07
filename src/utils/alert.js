import { Alert } from 'react-native';

export const alert = (title, detail, func) => {
  Alert.alert(
    title,
    detail,
    [
      {
        text: 'OK',
        onPress: func
      }
    ],
    { cancelable: false }
  );
};
