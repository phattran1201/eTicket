/* eslint-disable max-line-length */
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import { FS, SCALE_RATIO_WIDTH_BASIS, DEVICE_WIDTH } from '../constants/Constants';
import style, { APP_COLOR, APP_COLOR_2, headerHeight, APP_COLOR_TEXT } from '../constants/style';
import MyComponent from './MyComponent';
import LinearGradient from 'react-native-linear-gradient';

export default class HeaderWithBackButtonComponent extends MyComponent {
  static propTypes = {
    translucent: PropTypes.bool,
  };

  static defaultProps = {
    translucent: true,
  };

  render() {
    const {
      styleContent,
      bodyTitle,
      onPress,
      noShadow,
      styleShadow,
      translucent,
      styleIcon,
      showGardient,
      styleBody,
      iconColor,
    } = this.props;
    return (
      <View
        style={[
          style.header,
          {
            shadowColor: noShadow ? 'transparent' : APP_COLOR,
            borderBottomWidth: noShadow ? 0 : style.header.borderBottomWidth,
            elevation: noShadow ? 0 : style.header.elevation,
            backgroundColor: 'transprent',
            // height: translucent ? (IS_ANDROID ? headerHeight + fixHeaderTranslucent : headerHeight) : headerHeight,
            // paddingTop: translucent ? fixHeaderTranslucent : IS_ANDROID ? 0 : fixHeaderTranslucent
          },
          styleContent,
        ]}
      >
        {showGardient && (
          <LinearGradient
            start={{ x: 0.1, y: 0.75 }}
            end={{ x: 0.75, y: 0.25 }}
            colors={[APP_COLOR, APP_COLOR_2]}
            style={{
              position: 'absolute',
              width: DEVICE_WIDTH,
              height: headerHeight,
            }}
          />
        )}

        <StatusBar
          backgroundColor={translucent ? '#ffffff60' : '#fff'}
          barStyle='dark-content'
          translucent={translucent}
        />
        <TouchableOpacity
          onPress={onPress}
          style={[
            {
              paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS,
              // height: FS(30),
              // padding: FS(5),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            },
            styleIcon,
          ]}
        >
          <View
            style={{
              backgroundColor: showGardient ? 'transprent' : 'white',
              alignSelf: 'flex-start',
              borderRadius: FS(20),
            }}
          >
            <Icons name='arrow-left' size={FS(20)} color={iconColor || APP_COLOR} style={{ margin: FS(7) }} />
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={[
              style.titleHeader,
              { color: showGardient ? '#fff' : APP_COLOR_TEXT, fontSize: FS(18), textAlign: 'center' },
              styleBody,
            ]}
          >
            {bodyTitle || ''}
          </Text>
        </View>
        <View
          style={[
            {
              paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS,
              height: FS(30),
              padding: FS(5),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            },
            styleIcon,
          ]}
        >
          <View style={{ backgroundColor: 'transprent', padding: FS(5), borderRadius: FS(20) }}>
            <Icons name='arrow-right' size={FS(20)} color='transparent' />
          </View>
        </View>
      </View>
    );
  }
}
