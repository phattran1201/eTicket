import React, { Component } from 'react';
import { AppState, StyleSheet, View, Image, Alert, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { ROUTE_KEY, DEVICE_WIDTH } from '../../constants/Constants';
import global from '../../utils/globalUtils';
// import SplashScreen from 'react-native-splash-screen';
import strings from '../../constants/Strings';
import { loadListCategory } from './SplashActions';

class SplashComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isLoading: true,
      allowToLoadMainComponent: false,
      persistDone: false
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    AppState.addEventListener('memoryWarning', this.handleLowMemoryWarning);
    this.props.loadListCategory();
    this.props.navigation.replace(ROUTE_KEY.MAIN);
  }

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
