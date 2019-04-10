import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { SCALE_RATIO_WIDTH_BASIS, DEVICE_WIDTH, DEVICE_HEIGHT } from '../constants/Constants';
import BaseHeader from './BaseHeader';
import MyComponent from './MyComponent';

export default class LazyLoadComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      isLoadMore: false,
      show: false
    };
    this.show = false;
  }
  componentWillMount() {
    // clearTimeout(this.show);
    // this.setState({ show: false });
    // this.show = setTimeout(() => {
    //   this.setState({ show: true });
    // }, 500);
  }
  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }
  render() {
    return (
      <ImageBackground
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          backgroundColor: '#fff'
        }}
        source={require('../assets/ic_splash.png')}
      >
        <BaseHeader
          noShadow
          translucent
          styleContent={{
            backgroundColor: 'transparent'
          }}
        />

        {true ? (
          <AnimatedLottieView
            source={require('../assets/loading_2.json')}
            autoPlay
            loop
            hardwareAccelerationAndroid
            style={{
              alignSelf: 'center',
              backgroundColor: 'white',
              width: '100%',
              height: 150 * SCALE_RATIO_WIDTH_BASIS
            }}
            resizeMode="cover"
          />
        ) : null}
      </ImageBackground>
    );
  }
}
