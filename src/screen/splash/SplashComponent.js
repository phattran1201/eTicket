import React, { Component } from 'react';
import { AppState, StyleSheet, View, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { ROUTE_KEY, DEVICE_WIDTH } from '../../constants/Constants';
import global from '../../utils/globalUtils';
import { loadCategory } from './SplashActions';
// import SplashScreen from 'react-native-splash-screen';
import strings from '../../constants/Strings';

class SplashComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isLoading: true,
      allowToLoadMainComponent: false,
      persistDone: false
    };

    this.onGoBack = this.onGoBack.bind(this);

    this.exitApp = this.exitApp.bind(this);

    this.goToSetting = this.goToSetting.bind(this);

    this.addEventListener = this.addEventListener.bind(this);

    this.removeEventListener = this.removeEventListener.bind(this);

    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    AppState.addEventListener('memoryWarning', this.handleLowMemoryWarning);

    loadCategory()
      .then(result => {
        global.listCategory = result;
        global.categoryId = result[0].id;
        // SplashScreen.hide();
        this.props.navigation.replace(ROUTE_KEY.MAIN);
      })
      .catch(err => {});
  }

  handleBackPress() {
    Alert.alert(
      strings.close_app_title,
      strings.close_app_content,
      [
        {
          text: strings.back,
          onPress: null,
          style: 'cancel'
        },
        {
          text: strings.close,
          onPress: this.exitApp
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  }

  goToSetting() {
    Alert.alert(
      strings.notification,
      strings.turn_on_location_permission,
      [
        {
          text: strings.close,
          onPress: this.exitApp
        },
        {
          text: strings.go_to_device_setting,
          onPress: () => {
            setTimeout(() => {
              this.exitApp();
              // AndroidOpenSettings.appDetailsSettings();
            });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  }

  onGoBack() {
    this.setState({ isLoading: false });
  }

  componentWillUnmount() {
    // SplashScreen.hide();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleLowMemoryWarning = () => {
    console.log('memory low warning (due to big images)');
  };

  handleAppStateChange = nextAppState => {
    if (nextAppState.categoryId === global.categoryId) {
      console.log('Không gì thay đổi');
    }
    this.setState({ appState: nextAppState });
    global.categoryId = nextAppState;
  };

  render() {
    return (
      <View style={styles.content}>
        <Image
          style={{ width: DEVICE_WIDTH * 0.8 }}
          source={require('../../assets/LOGO_TLKV_500.png')}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const mapActionCreators = {};

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
