import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import AnimatedLottieView from 'lottie-react-native';
import { View, StyleSheet, Text } from 'react-native';
import style from '../constants/style.js';
import { FONT } from '../constants/style';
import { SCALE_RATIO_MAGIC } from '../constants/Constants.js';
import moment from 'moment';

const myArray = [
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/07/0743B5.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/02/26/452D96.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/25/2C0A0E.jpg',
];
const item = myArray[(Math.random() * myArray.length) | 0];
export default class MyImage extends Component {
  // static defaultProps = {
  //   end_date: moment(),
  // };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false,
    };
  }

  // replaceSource(source = '') {
  //   if (source.search('/admin/uploads')) return '';
  //   return source ? source.replace('localhost', 'hitek.com.vn').replace('toi.innoway.info', 'hitek.com.vn') : '';
  // }

  render() {
    const { source, size, styleContent, end_date } = this.props;
    return (
      <View>
        <FastImage
          style={[{}, this.props.style]}
          {...this.props}
          removeClippedSubviews
          source={
            source && source.uri && source.uri.search('https') !== -1 ? { uri: source.uri } : { uri: item }
            // : require('../assets/image_load_false.png')
          }
          onLoad={() => this.setState({ isLoading: false, isError: false })}
          onError={() => this.setState({ isError: true, isLoading: false })}
          defaultSource={null}
        />
        {moment().format('YYYY-MM-DD HH:mm:ss') > moment(end_date).format('YYYY-MM-DD HH:mm:ss') && (
          <View
            style={[
              {
                position: 'absolute',
                backgroundColor: '#00000080',
                zIndex: 999,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
              this.props.style,
            ]}
          >
            <Text
              style={[
                style.text,
                { fontFamily: FONT.CondensedBold, letterSpacing: 5, zIndex: 9999, color: 'white', textAlign: 'center' },
              ]}
            >
              Expired
            </Text>
          </View>
        )}
        {this.state.isLoading && !this.state.isError && (
          <AnimatedLottieView
            source={require('../assets/image_load.json')}
            autoPlay
            loop
            hardwareAccelerationAndroid
            style={[
              {
                position: 'absolute',
                alignSelf: 'center',
                backgroundColor: '#F3F3F3',
              },
            ]}
            resizeMode='cover'
          />
        )}
      </View>
    );
  }
}
