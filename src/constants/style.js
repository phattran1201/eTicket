/* eslint-disable import/imports-first */
import { Dimensions, Platform, StyleSheet } from 'react-native';
import {
  DEVICE_HEIGHT,
  FS,
  IS_IOS,
  SCALE_RATIO_HEIGHT_BASIS,
  SCALE_RATIO_WIDTH_BASIS,
  DEVICE_WIDTH
} from './Constants';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const width = Dimensions.get('window').width;

export const fixHeaderTranslucent =
  Platform.OS === 'android' && DeviceInfo.getSystemVersion() < '4.5' ? 0 : getStatusBarHeight();
export const headerHeight = 60 + fixHeaderTranslucent;

export const APP_COLOR = '#FF4D00';
export const APP_COLOR_2 = '#FFA555';
export const APP_COLOR_TEXT = '#333333';
export const APP_COLOR_TEXT_GRAY = '#707070';
export const APP_COLOR_TEXT_GRAY_2 = '#70707030';
export const APP_COLOR_BLUE = '#799dd8';
export const APP_COLOR_BLUE_2 = '#2A596B';

export const FONT = {
  HelveticaNeue: 'HelveticaNeue',
  Medium: 'HelveticaNeue-Medium',
  Bold: 'HelveticaNeue-Bold',
  BoldItalic: 'HelveticaNeue-BoldItalic',
  CondensedBlack: 'HelveticaNeue-CondensedBlack',
  CondensedBold: 'HelveticaNeue-CondensedBold',
  Italic: 'HelveticaNeue-Italic',
  LightItalic: 'HelveticaNeue-LightItalic',
  Light: 'Helvetica Neue Light',
  UltraLight: 'HelveticaNeue-UltraLight',
  UltraLightItalic: 'HelveticaNeue-UltraLightItalic',

};

const style = StyleSheet.create({
  text: {
    fontSize: FS(14),
    fontFamily: FONT.Regular,
    color: APP_COLOR_TEXT,
    backgroundColor: 'transparent'
  },
  textCaption: {
    fontSize: FS(12),
    fontFamily: FONT.Medium,
    color: APP_COLOR,
    backgroundColor: 'transparent'
  },
  textHeader: {
    fontSize: FS(16),
    fontFamily: FONT.CondensedBold,
    color: APP_COLOR_TEXT,
    backgroundColor: 'transparent'
    // textAlign: 'center'
  },
  //Button
  button: {
    height: 40 * SCALE_RATIO_HEIGHT_BASIS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: (41 * SCALE_RATIO_HEIGHT_BASIS) / 2,
    paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
    paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
    shadowRadius: 4
  },
  buttonBottom: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48 * SCALE_RATIO_HEIGHT_BASIS,
    bottom: 0,
    width,
    backgroundColor: APP_COLOR
  },
  //textInput
  textInput: {
    fontSize: FS(18),
    fontFamily: FONT.Medium,
    color: APP_COLOR_TEXT,
    backgroundColor: 'transparent',
    marginBottom: Platform.OS === 'ios' ? 0 : -5
  },
  textButton: {
    fontSize: FS(14),
    fontFamily: FONT.Medium,
    backgroundColor: 'transparent'
  },
  viewInput: {
    flexDirection: 'row',
    borderColor: Platform.OS === 'ios' ? '#C7AE6D30' : '#70707010',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 43 * SCALE_RATIO_HEIGHT_BASIS,
    borderRadius: (43 * SCALE_RATIO_HEIGHT_BASIS) / 2,
    paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
    paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
    shadowColor: APP_COLOR,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  },
  //shadow
  shadow: {
    overflow: 'visible',
    shadowColor: APP_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2
  },
  //header
  titleHeader: {
    fontSize: FS(18),
    fontFamily: FONT.Medium,
    color: APP_COLOR_TEXT,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  header: {
    paddingTop: fixHeaderTranslucent,
    borderTopWidth: 0,
    height: headerHeight,
    width: DEVICE_WIDTH,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: IS_IOS ? 5 : 0,
    borderColor: Platform.OS === 'ios' ? '#C7AE6D30' : 'transparent',
    shadowColor: APP_COLOR,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'visible'
  },
  iconHeader: {
    width: 20 * SCALE_RATIO_WIDTH_BASIS,
    height: 20 * SCALE_RATIO_WIDTH_BASIS,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //modal
  textModal: {
    fontSize: FS(16),
    fontFamily: FONT.Regular,
    color: APP_COLOR,
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center'
  },
  viewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Platform.OS === 'ios' ? '#C7AE6D30' : '#70707010',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
    borderRadius: 15 * SCALE_RATIO_HEIGHT_BASIS,
    paddingVertical: 12 * SCALE_RATIO_HEIGHT_BASIS,
    paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
    shadowColor: APP_COLOR,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  },

  textNormal: {
    fontSize: FS(14),
    fontFamily: FONT.Regular,
    color: APP_COLOR_TEXT,
    backgroundColor: 'transparent'
  },
  //icon
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 42 * SCALE_RATIO_WIDTH_BASIS,
    width: 42 * SCALE_RATIO_WIDTH_BASIS,
    borderRadius: (42 * SCALE_RATIO_WIDTH_BASIS) / 2,
    backgroundColor: APP_COLOR
  }
});

export default style;
