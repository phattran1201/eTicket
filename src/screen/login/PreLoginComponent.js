/* eslint-disable max-line-length */
import React from 'react';
import { ImageBackground, StatusBar, Text, View, Image } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import { connect } from 'react-redux';
import {
  DEVICE_WIDTH,
  FS,
  SCALE_RATIO_HEIGHT_BASIS,
  SCALE_RATIO_WIDTH_BASIS,
  ROUTE_KEY
} from '../../constants/Constants';
import style, { APP_COLOR, APP_COLOR_TEXT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import { Button, Icon } from 'react-native-elements';

const loginBackground = require('../../assets/background.png');

class PreLoginComponent extends MyComponent {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isShowingIntroduction: false,
      isShowMoreOption: true,
      showAccessPermission: false
    };
    // const { params } = this.props.navigation.state;
    // this.previousScreenName = params && params.fromScreen ? params.fromScreen : '';
  }

  componentDidMount() {
    // SplashScreen.hide();
    // isFirstTimeUseApp().then(isFirstTime => {
    //   if (isFirstTime) {
    //     setTimeout(() => {
    //       this.setState({ isShowingIntroduction: true, showAccessPermission: true });
    //     }, 300);
    //   }
    // });
  }
  showMoreOption() {
    // this.setState({ isShowMoreOption: !this.state.isShowMoreOption });
    // if (this.state.isShowMoreOption) {
    //   this.refs.showMoreOption.scrollToEnd();
    // } else {
    //   this.refs.showMoreOption.scrollTo(0);
    // }
  }
  // flowAccessPermission(self) {
  //   onRequestPermission(
  //     [
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       PermissionsAndroid.PERMISSIONS.CAMERA,
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     ],
  //     self,
  //     () => {
  //       setFirstTimeUseApp(false);
  //       self.setState({ showAccessPermission: false });
  //     },
  //     true,
  //     false
  //   );
  // }

  render() {
    return (
      <ImageBackground
        source={loginBackground}
        style={{
          flex: 1,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StatusBar backgroundColor='#ffffff60' barStyle="dark-content" translucent />

        <View
          style={{
            flex: 1,
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              width: (85 / 100) * DEVICE_WIDTH,
              marginBottom: 50
            }}
            resizeMode="contain"
            source={require('../../assets/logo.png')}
          />
          {/* <Button
            outline
            buttonStyle={[style.button,
            style.shadow,
            {
              backgroundColor: '#fff'
            }]}
            titleStyle={style.text}
            title="Đăng nhập bằng điện thoại"
          /> */}
          <Button
            onPress={() => this.props.navigation.navigate(ROUTE_KEY.LOGIN)}
            containerStyle={{
              width: (85 / 100) * DEVICE_WIDTH
            }}
            outline
            buttonStyle={[
              style.shadow,
              {
                paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                backgroundColor: '#fff'
              }]}
            titleStyle={style.text}
            title="Đăng nhập bằng email"
          />
          <View
            style={{
              paddingVertical: 20 * SCALE_RATIO_HEIGHT_BASIS,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: (70 / 100) * DEVICE_WIDTH
            }}
          >
            <View
              style={{
                height: SCALE_RATIO_WIDTH_BASIS,
                backgroundColor: 'white',
                flex: 1
              }}
            />
            <Text
              style={[
                style.textCaption,
                {
                  textAlign: 'center',
                  fontSize: FS(13),
                  color: 'white',
                  flex: 3
                }
              ]}
            >
              hoặc đăng nhập bằng
            </Text>
            <View
              style={{
                height: SCALE_RATIO_WIDTH_BASIS,
                backgroundColor: 'white',
                flex: 1
              }}
            />
          </View>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: (85 / 100) * DEVICE_WIDTH
            }}
          >
            <Button
              containerStyle={{ flex: 8 }}
              outline
              buttonStyle={[
                style.shadow,
                {
                  // flex: 1,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: '#3b5998'
                }]}
              icon={
                <Icon
                  type='font-awesome'
                  name="facebook"
                  size={FS(16)}
                  color="white"
                />
              }
              titleStyle={[style.text, { color: 'white', marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS }]}
              title="Facebook"
            />
            <View
              style={{ flex: 2 }}
            />
            <Button
              containerStyle={{ flex: 8 }}

              outline
              buttonStyle={[
                style.shadow,
                {
                  // flex: 1,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: '#CB4036'
                }]}
              icon={
                <Icon
                  type='font-awesome'
                  name="google"
                  size={FS(16)}
                  color="white"
                />
              }
              titleStyle={[style.text, { color: 'white', marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS }]}
              title="Google"
            />
          </View>

        </View>
      </ImageBackground>
    );
  }
}

const mapActionCreators = {
};
const mapStateToProps = state => ({
});
export default connect(
  mapStateToProps,
  mapActionCreators
)(PreLoginComponent);
