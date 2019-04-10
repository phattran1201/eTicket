/* eslint-disable max-line-length */
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/dist/Feather';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import { FS, SCALE_RATIO_WIDTH_BASIS } from '../constants/Constants';
import style, { APP_COLOR } from '../constants/style';
import MyComponent from './MyComponent';

class BaseHeader extends MyComponent {
  static propTypes = {
    translucent: PropTypes.bool
  };

  static defaultProps = {
    translucent: true
  };

  renderIcon(type, icon, styles) {
    if (type === 'Ionicons') {
      return <Ionicons name={icon} size={(styles && styles.width) || FS(20)} style={styles} color={APP_COLOR} />;
    }
    if (type === 'MaterialIcons') {
      return <MaterialIcons name={icon} size={(styles && styles.width) || FS(20)} style={styles} color={APP_COLOR} />;
    }
    if (type === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons name={icon} size={(styles && styles.width) || FS(20)} style={styles} color={APP_COLOR} />
      );
    }
    if (type === 'Feather') {
      return <Feather name={icon} size={(styles && styles.width) || FS(20)} style={styles} color={APP_COLOR} />;
    }
    if (type === 'SimpleLineIcons') {
      return <SimpleLineIcons name={icon} size={(styles && styles.width) || FS(20)} style={styles} color={APP_COLOR} />;
    }
    if (type === 'Image') {
      return <Image source={icon} resizeMode="contain" style={[style.iconHeader, styles]} />;
    }
    return <View style={{ width: 20 * SCALE_RATIO_WIDTH_BASIS, height: 20 * SCALE_RATIO_WIDTH_BASIS }} />;
  }

  componentWillUnmount() {
    clearTimeout(this.onLeftPressTimeout);
    clearTimeout(this.onRightPressTimeout);
  }

  render() {
    const {
      children,
      leftIcon,
      leftIconType,
      onLeftPress,

      rightIcon,
      rightIconType,
      onRightPress,
      leftIconStyle,
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
      styleShadow,
      ringColor,
      qrColor,
      translucent,
      valueMenu,
      styleLeftContent
    } = this.props;

    return (
      <View
        style={[
          style.header,
          {
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
        {leftIcon ? (
          <View>
            {leftIcon === 'qr' ? (
              <TouchableOpacity
                onPress={() => {
                  this.onLeftPressTimeout = setTimeout(() => {
                    if (onLeftPress) onLeftPress();
                  }, 0);
                }}
                style={[
                  {
                    paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS,
                    height: FS(30),
                    padding: FS(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                  },
                  styleLeftContent
                ]}
              >
                <Image
                  // source={
                  //   this.props.qrColor
                  //     ? require('../../assets/imgs/icons/qrColor.png')
                  //     : require('../../assets/imgs/icons/qr.png')
                  // }
                  style={[style.iconHeader]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.onLeftPressTimeout = setTimeout(() => {
                      if (onLeftPress) onLeftPress();
                    }, 0);
                  }}
                  style={[
                    {
                      paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS,
                      height: FS(30),
                      padding: FS(5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center'
                    },
                    styleLeftContent
                  ]}
                >
                  {this.renderIcon(leftIconType, leftIcon, leftIconStyle)}
                </TouchableOpacity>
              )}
          </View>
        ) : (
            <View
              style={[
                {
                  paddingLeft: 15 * SCALE_RATIO_WIDTH_BASIS,
                  height: FS(30),
                  padding: FS(5),
                  backgroundColor: 'transprent',
                  borderRadius: FS(30) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center'
                },
                { styleLeftContent }
              ]}
            >
              <Feather name="arrow-left" size={FS(20)} color="transparent" />
            </View>
          )}

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center'
          }}
        >
          {children}
        </View>

        {rightIcon || rightIcon2 || rightIcon3 || rightIconMenu ? null : (
          <Feather name="arrow-right" size={FS(20)} color="transparent" style={[styles.rightStyle, btnRightStyle]} />
        )}

        {rightIcon ? (
          <View>
            {rightIcon === 'envelope' || rightIcon === 'bell' ? (
              {
                /* <IconMessageAndBadgeComponent
                ringColor={ringColor}
                rightIconStyle={rightIconStyle || '#C7AE6d'}
                navigation={this.props.navigation}
                style={[styles.rightStyle, btnRightStyle]}
              /> */
              }
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

        {rightIconMenu ? (
          <Dropdown
            data={dataMenu}
            dropdownPosition={0}
            itemColor="rgba(0, 0, 0, .87)"
            pickerStyle={{
              width: 128,
              borderTopRightRadius: 0,
              left: null,
              right: 10 * SCALE_RATIO_WIDTH_BASIS,
              marginTop: 10 * SCALE_RATIO_WIDTH_BASIS
            }}
            disabled={this.props.disabledDropdown}
            overlayStyle={{ borderTopRightRadius: 0 }}
            fontSize={15 * SCALE_RATIO_WIDTH_BASIS}
            itemTextStyle={style.text}
          >
            <View style={{ flexDirection: 'row' }}>
              {valueMenu ? <Text style={style.text}>{valueMenu}</Text> : null}
              {this.renderIcon(rightIconTypeMenu, rightIconMenu, rightIconStyleMenu)}
            </View>
          </Dropdown>
        ) : null}
      </View>
    );
  }
}

export default BaseHeader;

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
