import React, { Component } from 'react';
import { AppState, AsyncStorage, Image, Platform, StatusBar, StyleSheet, Vibration, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from '../../config/redux/store';
import { DEVICE_HEIGHT, DEVICE_WIDTH, ROUTE_KEY } from '../../constants/Constants';
import { APP_COLOR } from '../../constants/style';
import { alert } from '../../utils/alert';
import { loadListCategory } from './SplashActions';
import { getUserToken } from '../../utils/asyncStorage';
import SplashScreen from 'react-native-splash-screen';

class SplashComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isLoading: true,
      allowToLoadMainComponent: false,
      persistDone: false,
    };

    // this.UNSAFE_componentWillMount.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  componentWillMount() {
    persistStore(store, null, () => {
      console.log('userData', getUserToken(), this.props.userData);
      if (this.props.token !== '' && this.props.userData && this.props.isLoggedIn) {
        this.props.navigation.replace(ROUTE_KEY.MAIN);
      } else {
        this.props.navigation.replace(ROUTE_KEY.PRE_LOGIN);
      }
    });
  }
  async componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.checkPermission();
    this.createNotificationListeners();
    this.props.loadListCategory();
    SplashScreen.hide();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.notificationListener;
    this.notificationOpenedListener;
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log('dauphaiphat:checkPermission ', enabled);
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
      const channel = new firebase.notifications.Android.Channel(
        'eTicket',
        'eTicket',
        firebase.notifications.Android.Importance.Min
      ).setDescription('eTicket');
      // Create the channel
      firebase.notifications().android.createChannel(channel);
      // Build a channel group
      const channelGroup = new firebase.notifications.Android.ChannelGroup('eTicket', 'eTicket');
      // Create the channel group
      firebase.notifications().android.createChannelGroup(channelGroup);
      const localNotification = new firebase.notifications.Notification()
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
      Vibration.vibrate(1000);
      console.log('dauphaiphat: Notification', notification);
    });

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
      const channel = new firebase.notifications.Android.Channel(
        'eTicket',
        'eTicket',
        firebase.notifications.Android.Importance.Min
      ).setDescription('eTicket');
      // Create the channel
      firebase.notifications().android.createChannel(channel);
      // Build a channel group
      const channelGroup = new firebase.notifications.Android.ChannelGroup('eTicket', 'eTicket');
      // Create the channel group
      firebase.notifications().android.createChannelGroup(channelGroup);
      console.log('dauphaiphat: messageListener', message);
      const notification = new firebase.notifications.Notification()
        .setNotificationId(message.notificationId)
        .android.setAutoCancel(true)
        .setTitle(message.title)
        .setSubtitle(message.subtitle)
        .setBody(message.body)
        .setData(message.data)
        .android.setChannelId('eTicket') // e.g. the id you chose above
        // .android.setSmallIcon('@drawable/ic_launcher') // creat`e this icon in Android Studio
        .android.setColor(APP_COLOR); // you can set a color here
      // .android.setPriority(firebase.notifications.Android.Priority.High);
      firebase
        .notifications()
        .displayNotification(notification)
        .catch(err => console.error(err));
      Vibration.vibrate(1000);
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
          this._onChangeToken(token, DeviceInfo.getDeviceLocale());
          console.log('FCM tu sever', token);
        });
      if (fcmToken) {
        // user has a device token
        console.log('FCM tu device', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
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
      device_language: language,
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
    }
  };

  render() {
    return (
      <View style={styles.content}>
        <StatusBar barStyle='dark-content' translucent />
        {/*
        <Image
          style={{ flex: 1, width: DEVICE_WIDTH, height: DEVICE_HEIGHT, alignSelf: 'center' }}
          source={require('../../assets/ic_splash.png')}
          resizeMode='cover'
        /> */}
      </View>
    );
  }
}

const mapActionCreators = { loadListCategory };

const mapStateToProps = state => ({
  userData: state.user.userData,
  isLoggedIn: state.user.isLoggedIn,
  token: state.user.token,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(SplashComponent);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
