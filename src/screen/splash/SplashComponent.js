import React, { Component } from 'react';
import { AppState, StyleSheet, View, Image, Alert, StatusBar, AsyncStorage, Platform } from 'react-native';
import { connect } from 'react-redux';
import { ROUTE_KEY, DEVICE_WIDTH } from '../../constants/Constants';
import { loadListCategory } from './SplashActions';
import firebase from 'react-native-firebase';
import { alert } from '../../utils/alert';
import { APP_COLOR } from '../../constants/style';
import DeviceInfo from 'react-native-device-info';

class SplashComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isLoading: true,
      allowToLoadMainComponent: false,
      persistDone: false
    };
    // this.UNSAFE_componentWillMount.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.checkPermission();
    this.createNotificationListeners();
    this.props.loadListCategory();
    this.props.navigation.replace(ROUTE_KEY.MAIN);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
      firebase.messaging().onTokenRefresh(token => {
        this._onChangeToken(token, DeviceInfo.getDeviceLocale());
      });
    } else {
      this.requestPermission();
    }
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase.notifications().onNotification(notification => {
      console.log('dauphaiphat: Notification', notification);
      const { title, body } = notification;

      const localNotification = new firebase.notifications.Notification({
        show_in_foreground: true
      })
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .android.setChannelId('eTicket') // e.g. the id you chose above
        // .android.setSmallIcon('@drawable/ic_launcher') // creat`e this icon in Android Studio
        .android.setColor(APP_COLOR); // you can set a color here
      // .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase
        .notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
    });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_default_channel',
      'eTicket',
      firebase.notifications.Android.Importance.High
    ).setDescription('eTicket description');

    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
      console.log('dauphaiphat: App background', notificationOpen);
      const { title, body } = notificationOpen.notification;
      alert(title, body);
    });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      console.log('dauphaiphat: App tat han', notificationOpen);
      const { title, body } = notificationOpen.notification;
      console.log('getInitialNotification:', title, body);
      alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log('dauphaiphat: SplashComponent -> createNotificationListeners -> message', message);
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase
        .messaging()
        .getToken()
        .then(token => {
          console.log('dauphaiphat: SplashComponent -> getToken -> token', token);
          this._onChangeToken(token, DeviceInfo.getDeviceLocale());
        });
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken:', fcmToken);
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected', error);
    }
  }
  handleAppStateChange = nextAppState => {
    console.log('dauphaiphat: SplashComponent -> nextAppState', nextAppState);
    this.setState({ appState: nextAppState });
  };
  _onChangeToken = (token, language) => {
    const data = {
      device_token: token,
      device_type: Platform.OS,
      device_language: language
    };

    this._loadDeviceInfo(data).done();
  };

  _loadDeviceInfo = async deviceData => {
    // load the data in 'local storage'.
    // this value will be used by login and register components.
    const value = JSON.stringify(deviceData);
    try {
      await AsyncStorage.setItem('@deviceInfo:key', value);
    } catch (error) {
      console.log('dauphaiphat: SplashComponent -> error', error);
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.content}>
        <StatusBar barStyle="dark-content" translucent />

        <Image
          style={{ width: DEVICE_WIDTH * 0.8 }}
          source={require('../../assets/LOGO_TLKV_500.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const mapActionCreators = { loadListCategory };

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapActionCreators
)(SplashComponent);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
