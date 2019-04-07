import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { DEVICE_HEIGHT, SCALE_RATIO_WIDTH_BASIS } from '../constants/Constants';
import strings from '../constants/Strings';

const { height, width } = Dimensions.get('window');

export default class MyPopupSpinner extends React.PureComponent {
  static instance = null;

  static show() {
    if (MyPopupSpinner.instance) MyPopupSpinner.instance.setState({ visible: true });
  }

  static hide() {
    if (MyPopupSpinner.instance) MyPopupSpinner.instance.setState({ visible: false });
  }

  constructor(props) {
    super(props);
    MyPopupSpinner.instance = this;
    this.state = {
      visible: false
    };
  }
  render() {
    return (
      <Spinner
        visible={MyPopupSpinner.instance.state.visible}
        textContent={strings.loading}
        textStyle={{ color: '#fff' }}
        style={{ zIndex: 99999, elevation: 9999 }}
        overlayColor="transparent"
      >
        <View
          style={{
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent'
          }}
        >
          <View
            style={{
              width: 25 * (SCALE_RATIO_WIDTH_BASIS - DEVICE_HEIGHT / 224),
              height: 25 * (SCALE_RATIO_WIDTH_BASIS - DEVICE_HEIGHT / 224),
              borderRadius: 5 * (SCALE_RATIO_WIDTH_BASIS - DEVICE_HEIGHT / 224),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          >
            <LottieView
              source={require('../assets/preloader.json')}
              autoPlay
              loop
              hardwareAccelerationAndroid
              style={{
                width: 30 * (SCALE_RATIO_WIDTH_BASIS - DEVICE_HEIGHT / 224),
                height: 30 * (SCALE_RATIO_WIDTH_BASIS - DEVICE_HEIGHT / 224),
                alignSelf: 'center'
              }}
            />
          </View>
        </View>
      </Spinner>
    );
  }
}
