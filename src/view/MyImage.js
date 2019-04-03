import React, { Component } from 'react';
import FastImage from 'react-native-fast-image';
import AnimatedLottieView from 'lottie-react-native';
import { View } from 'react-native';

export default class MyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isError: false
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
            source && source.uri && source.uri.search('https') !== -1
              ? { uri: source.uri }
              : require('../assets/image_load_false.png')
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
                backgroundColor: '#F3F3F3'
              },
              this.props.style
            ]}
            resizeMode="cover"
          />
        )}
      </View>
    );
  }
}
