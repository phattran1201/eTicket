import React from 'react';
import { Image, ImageBackground, Text, View, } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  DEVICE_WIDTH,
  FS,
  ROUTE_KEY,
  SCALE_RATIO_WIDTH_BASIS,
  SCALE_RATIO_HEIGHT_BASIS
} from '../../constants/Constants';
import strings from '../../constants/Strings';
import style, { APP_COLOR_TEXT, FONT, APP_COLOR } from '../../constants/style';
import { alert } from '../../utils/alert';
import BaseHeader from '../../view/BaseHeader';
import MySpinner from '../../view/MySpinner';
// import { loginFail, loginPromise, loginSuccess } from './SignInActions';
import MyComponent from '../../view/MyComponent';
import { Input, Button } from 'react-native-elements';

const loginBackground = require('../../assets/background.png');

class RegisterComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }

  // loginFunction() {
  //   MySpinner.show();
  //   if (this.state.username === '' || this.state.password === '') {
  //     alert(strings.alert, strings.please_input_all_information);
  //     MySpinner.hide();
  //     return;
  //   }
  //   if (this.state.password.length < 6) {
  //     alert(strings.alert, strings.password_must_atleast_6_charactor);
  //     MySpinner.hide();
  //     return;
  //   }

  //   if (this.state.isLoading) return;
  //   this.setState({ isLoading: true });
  //   loginPromise(this.state.username, this.state.password, () => MySpinner.hide())
  //     .then(res => {
  //       this.props.loginSuccess(res, this, null, () => {
  //         const temp = { ...this.props.userData };
  //         temp.imei = DeviceInfo.getUniqueID();
  //         this.props.updateUserInfo(temp, () => {
  //           console.log('Hoang log uniqueId', temp.imei);
  //           const { params } = this.props.navigation.state;
  //           const previousScreenName = params && params.fromScreen ? params.fromScreen : '';
  //           console.log('poi previousScreenName:', previousScreenName);
  //           if (previousScreenName === '') {
  //             this.props.navigation.navigate(ROUTE_KEY.MAIN);
  //           } else {
  //             this.props.navigation.replace(previousScreenName);
  //           }
  //         });
  //         MySpinner.hide();
  //       });
  //     })
  //     .catch(err => loginFail(err, this, () => MySpinner.hide()));
  // }

  render() {
    return (


      <KeyboardAwareScrollView behavior="padding" style={{ flex: 1, backgroundColor: 'white' }}>
        <BaseHeader
          noShadow
          translucent
          leftIcon="arrow-left"
          leftIconType="Feather"
          styleContent={{
            backgroundColor: 'transparent'
          }}
          onLeftPress={() => this.props.navigation.goBack()}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              width: 65 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
            }}
            resizeMode="contain"
            source={require('../../assets/image/ic_login.png')}
          />
          <Text style={[style.titleHeader, { fontSize: FS(28), marginBottom: 22 * SCALE_RATIO_WIDTH_BASIS, }]}>Log in to eTicket</Text>
          <Text style={[style.text, { textAlign: 'center', marginBottom: 25 * SCALE_RATIO_WIDTH_BASIS, }]}>Connect with us to not miss your favorite event</Text>

          <View
            style={{
              width: (85 / 100) * DEVICE_WIDTH
            }}
          >
            <Input
              containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              inputContainerStyle={{ borderColor: APP_COLOR_TEXT, borderWidth: SCALE_RATIO_WIDTH_BASIS, marginVertical: 5 * SCALE_RATIO_WIDTH_BASIS, paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS, borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS }}
              clearButtonMode="while-editing"
              // placeholder="Nhập từ khóa..."
              rightIcon={{ type: 'material', name: 'mail-outline' }}

              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              label='Email'
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              // errorStyle={{ color: 'red' }}
              // errorMessage='ENTER A VALID ERROR HERE'
              inputStyle={style.text}
            />
            <Input
              rightIcon={{ type: 'material', name: 'lock-outline' }}

              containerStyle={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 * SCALE_RATIO_WIDTH_BASIS }}
              inputContainerStyle={{ borderColor: APP_COLOR_TEXT, borderWidth: SCALE_RATIO_WIDTH_BASIS, marginVertical: 5 * SCALE_RATIO_WIDTH_BASIS, paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS, borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS }}
              clearButtonMode="while-editing"
              // placeholder="Nhập từ khóa..."
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              label='Password'
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              // errorStyle={{ color: 'red' }}
              // errorMessage='ENTER A VALID ERROR HERE'
              inputStyle={style.textInput}
            />
            <Button
              onPress={() => { }}
              containerStyle={{
                width: (85 / 100) * DEVICE_WIDTH, marginTop: 20 * SCALE_RATIO_WIDTH_BASIS
              }}
              buttonStyle={[

                {
                  height: 47 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: APP_COLOR
                }]}
              titleStyle={[style.text, { color: 'white' }]}
              title="Log in"
            />
            <Button
              onPress={() => { }}
              containerStyle={{
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
                width: (85 / 100) * DEVICE_WIDTH,
                marginTop: 10 * SCALE_RATIO_WIDTH_BASIS
              }}
              type="outline"
              buttonStyle={[

                {
                  height: 47 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: 'white',
                  borderColor: APP_COLOR
                }]}
              titleStyle={[style.text, { color: APP_COLOR }]}
              title="Create account"
            />
            {/* <MyTextInputFloat
                  styleContent={{ marginBottom: 30 * SCALE_RATIO_WIDTH_BASIS }}
                  labelStyle={{ paddingHorizontal: 0, color: APP_COLOR_TEXT }}
                  inputStyle={{ paddingHorizontal: 0 }}
                  label={'Email'}
                  iconClass={FontAwesomeIcon}
                  iconName={'heart'}
                  iconColor={'#C7AE6D'}
                  onChangeText={username => this.setState({ username })}
                  value={this.state.username}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => this.txtPassword.focus()}
                />

                <MyTextInputFloat
                  styleContent={{ marginBottom: 0 }}
                  labelStyle={{ paddingHorizontal: 0, color: APP_COLOR_TEXT }}
                  inputStyle={{ paddingHorizontal: 0 }}
                  label={'Mật khẩu'}
                  iconClass={FontAwesomeIcon}
                  iconName={'heart'}
                  iconColor={'#C7AE6D'}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                  secureTextEntry
                  returnKeyType="go"
                  ref={instance => (this.txtPassword = instance)}
                  onSubmitEditing={() => this.loginFunction()}
                  disabled={this.state.isLoading || this.state.username === '' || this.state.password === ''}
                /> */}

          </View></View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapActionCreators = {
};

const mapStateToProps = state => ({
  // userData: state.user.userData
});
export default connect(
  mapStateToProps,
  mapActionCreators
)(RegisterComponent);
