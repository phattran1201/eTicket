import LottieView from 'lottie-react-native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { SCALE_RATIO_WIDTH_BASIS } from '../constants/Constants';
import strings from '../constants/Strings';
import MyPopupSpinner from './MyPopupSpinner';

const { height, width } = Dimensions.get('window');

export default class MySpinner extends React.PureComponent {
  static instance = null;

  static show() {
    if (MySpinner.instance) MySpinner.instance.setState({ visible: true });
    MyPopupSpinner.show();
  }

  static hide() {
    if (MySpinner.instance) MySpinner.instance.setState({ visible: false });
    MyPopupSpinner.hide();
  }

  constructor(props) {
    super(props);
    MySpinner.instance = this;
    this.state = {
      visible: false
    };
  }
  render() {
    return (
      <Spinner
        visible={MySpinner.instance.state.visible}
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
              width: 60 * SCALE_RATIO_WIDTH_BASIS,
              height: 60 * SCALE_RATIO_WIDTH_BASIS,
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
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
                width: 50 * SCALE_RATIO_WIDTH_BASIS,
                height: 50 * SCALE_RATIO_WIDTH_BASIS,
                alignSelf: 'center'
              }}
            />
          </View>
        </View>
      </Spinner>
    );
  }
}
