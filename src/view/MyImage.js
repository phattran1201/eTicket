import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import AnimatedLottieView from 'lottie-react-native';
import { View } from 'react-native';

const myArray = [
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/18/67A280.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/07/0743B5.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/02/26/452D96.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/01/10/65377E.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/08/95CB22.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/12/07E4A5.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/14/15C228.jpg',
  'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/03/25/2C0A0E.jpg',
];
const item = myArray[(Math.random() * myArray.length) | 0];
export default class MyImage extends Component {
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
    const { source, size, styleContent } = this.props;
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
