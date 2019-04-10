/* eslint-disable max-line-length */
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import { DEVICE_WIDTH, FS, SCALE_RATIO_WIDTH_BASIS } from '../constants/Constants';
import style, { APP_COLOR, APP_COLOR_TEXT, FONT } from '../constants/style';
import MyComponent from './MyComponent';

class HeaderWithAvatar extends MyComponent {
  static propTypes = {
    translucent: PropTypes.bool
  };

  static defaultProps = {
    translucent: true
  };

  renderIcon(type, icon, styles) {
    if (type === 'Ionicons') {
      return <Ionicons name={icon} size={FS(20)} style={styles} color="#C7AE6D" />;
    }
    if (type === 'MaterialIcons') {
      return <MaterialIcons name={icon} size={FS(20)} style={styles} color="#C7AE6D" />;
    }
    if (type === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={icon} size={FS(20)} style={styles} color="#C7AE6D" />;
    }
    if (type === 'Feather') {
      return <Feather name={icon} size={FS(20)} style={styles} color="#C7AE6D" />;
    }
    if (type === 'SimpleLineIcons') {
      return <SimpleLineIcons name={icon} size={FS(20)} style={styles} color="#C7AE6D" />;
    }
    if (type === 'Image') {
      return <Image source={icon} resizeMode="contain" style={[style.iconHeader, styles]} />;
    }
    return <View style={{ width: 20 * SCALE_RATIO_WIDTH_BASIS, height: 20 * SCALE_RATIO_WIDTH_BASIS }} />;
  }

  componentWillUnmount() {
    clearTimeout(this.onLeftPressTimeout);
    clearTimeout(this.onRightPressTimeout);
    clearTimeout(this.onAvatarPressTimeout);
    clearTimeout(this.onPointPressTimeout);
  }

  render() {
    const {
      children,
      avatar,
      onAvatarPress,
      avatarStyle,
      name,
      point,

      rightIcon,
      rightIconType,
      onRightPress,
      rightIconStyle,
      btnRightDisabled,
      btnRightStyle,

      rightIcon2,
      rightIconType2,
      onRightPress2,
      btnRightDisabled2,
      rightIconStyle2,
      btnRightStyle2,

      rightIcon3,
      rightIconType3,
      onRightPress3,
      btnRightDisabled3,
      rightIconStyle3,
      btnRightStyle3,

      rightIconMenu,
      dataMenu,
      rightIconTypeMenu,
      rightIconStyleMenu,

      styleContent,
      noShadow,
      ringColor,
      translucent,
      valueMenu,
      onPointPress
    } = this.props;
    return (
      <View>
        <View
          style={[
            style.header,
            {
              justifyContent: 'space-between',
              shadowColor: noShadow ? 'transparent' : APP_COLOR,
              borderBottomWidth: noShadow ? 0 : style.header.borderBottomWidth,
              elevation: noShadow ? 0 : style.header.elevation,
              backgroundColor: '#fff'
            },
            styleContent
          ]}
        >
          <StatusBar
            backgroundColor={translucent ? '#ffffff60' : '#fff'}
            barStyle="dark-content"
            translucent={translucent}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ zIndex: 99, paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS }}
              onPress={() => {
                this.onAvatarPressTimeout = setTimeout(() => {
                  if (onAvatarPress) onAvatarPress();
                }, 0);
              }}
            >
              <Image
                source={{
                  uri:
                    avatar ||
                    'https://tea-3.lozi.vn/v1/images/resized/logo-toco-toco-1529484698-1-6041526-1529484698?w=960&type=o'
                }}
                resizeMode="cover"
                style={[
                  {
                    width: 35 * SCALE_RATIO_WIDTH_BASIS,
                    height: 35 * SCALE_RATIO_WIDTH_BASIS,
                    borderRadius: (35 * SCALE_RATIO_WIDTH_BASIS) / 2,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                  },
                  avatarStyle
                ]}
              />
            </TouchableOpacity>

            <View
              style={{
                maxWidth: (DEVICE_WIDTH * 80) / 100,
                marginLeft: -(35 * SCALE_RATIO_WIDTH_BASIS)
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#f0f0f050',
                  paddingRight: 15 * SCALE_RATIO_WIDTH_BASIS,
                  paddingLeft: 45 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: (35 * SCALE_RATIO_WIDTH_BASIS) / 2,
                  justifyContent: 'center'
                }}
              >
                {/* {children}
                 */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    onPress={() => {
                      this.onAvatarPressTimeout = setTimeout(() => {
                        if (onAvatarPress) onAvatarPress();
                      }, 0);
                    }}
                    style={[
                      {
                        fontSize: FS(16),
                        color: APP_COLOR_TEXT,
                        fontFamily: FONT.Medium
                      }
                    ]}
                  >
                    {name || 'Đăng Nhập'}
                  </Text>
                  {point ? (
                    <TouchableOpacity
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        this.onPointPressTimeout = setTimeout(() => {
                          if (onPointPress) onPointPress();
                        }, 0);
                      }}
                    >
                      <View
                        style={{
                          width: 1.5,
                          height: 35 * SCALE_RATIO_WIDTH_BASIS,
                          backgroundColor: `${APP_COLOR}10`,
                          marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS
                        }}
                      />
                      <Text
                        style={[
                          {
                            fontSize: FS(16),
                            color: APP_COLOR,
                            fontFamily: FONT.Medium
                          }
                        ]}
                      >
                        {point || 0}{' '}
                        <Text
                          style={{
                            fontSize: FS(12),
                            color: APP_COLOR_TEXT,
                            fontFamily: FONT.Regular
                          }}
                        >
                          điểm
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          {rightIcon || rightIcon2 || rightIcon3 || rightIconMenu ? null : (
            <Feather name="arrow-right" size={FS(20)} color="transparent" style={[styles.rightStyle, btnRightStyle]} />
          )}

          {rightIcon ? (
            <View style={{ paddingRight: 15 * SCALE_RATIO_WIDTH_BASIS }}>
              {rightIcon === 'envelope' || rightIcon === 'bell' ? (
                <TouchableOpacity
                  disabled={btnRightDisabled}
                  onPress={() => {
                    this.onRightPressTimeout = setTimeout(() => {
                      if (onRightPress) onRightPress();
                    }, 0);
                  }}
                  style={[styles.rightStyle, btnRightStyle]}
                >
                  {this.renderIcon(rightIconType, rightIcon, rightIconStyle)}
                </TouchableOpacity>
              ) : (
                  <TouchableOpacity
                    disabled={btnRightDisabled}
                    onPress={() => {
                      this.onRightPressTimeout = setTimeout(() => {
                        if (onRightPress) onRightPress();
                      }, 0);
                    }}
                    style={[styles.rightStyle, btnRightStyle]}
                  >
                    {this.renderIcon(rightIconType, rightIcon, rightIconStyle)}
                  </TouchableOpacity>
                )}
            </View>
          ) : null}

          {rightIcon2 ? (
            <TouchableOpacity
              disabled={btnRightDisabled2}
              onPress={() => {
                this.onRightPressTimeout2 = setTimeout(() => {
                  if (onRightPress2) onRightPress2();
                }, 0);
              }}
              style={[styles.rightStyle, btnRightStyle2]}
            >
              {this.renderIcon(rightIconType2, rightIcon2, rightIconStyle2)}
            </TouchableOpacity>
          ) : null}

          {rightIcon3 ? (
            <TouchableOpacity
              disabled={btnRightDisabled3}
              onPress={() => {
                this.onRightPressTimeout3 = setTimeout(() => {
                  if (onRightPress3) onRightPress3();
                }, 0);
              }}
              style={[styles.rightStyle, btnRightStyle3]}
            >
              {this.renderIcon(rightIconType3, rightIcon3, rightIconStyle3)}
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default HeaderWithAvatar;
const styles = StyleSheet.create({
  rightStyle: {
    paddingRight: 15 * SCALE_RATIO_WIDTH_BASIS,
    height: FS(30),
    padding: FS(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
