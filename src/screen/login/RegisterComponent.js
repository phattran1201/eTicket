import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import {
  DEVICE_WIDTH,
  FS,
  ROUTE_KEY,
  SCALE_RATIO_WIDTH_BASIS,
  SCALE_RATIO_HEIGHT_BASIS,
} from '../../constants/Constants';
import strings from '../../constants/Strings';
import style, { APP_COLOR_TEXT, FONT, APP_COLOR } from '../../constants/style';
import { alert } from '../../utils/alert';
import BaseHeader from '../../view/BaseHeader';
import MySpinner from '../../view/MySpinner';
// import { loginFail, loginPromise, loginSuccess } from './SignInActions';
import MyComponent from '../../view/MyComponent';
import { Input, Button, CheckBox } from 'react-native-elements';
import { checkEmailExists } from './RegisterActions';

const loginBackground = require('../../assets/background.png');

class RegisterComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      checkusername: true,
      checkemail: true,
      checkEmailExists: false,
      checkEmailExistsMess: '',
      checkpassword: true,
      isLoading: false,
      checked: false,
    };
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  registerFunc() {
    this.setState({ isLoading: true });
    MySpinner.show();
    if (this.validateEmail(this.state.email)) {
      checkEmailExists(this.state.email).then(res => {
        console.log('dauphaiphat: res', res.message);
        if (res.status_code === 200) {
          MySpinner.hide();
          this.setState({ checkemail: true, checkEmailExists: false, isLoading: false });
        }
        if (res.status_code === 401) {
          MySpinner.hide();
          this.setState({ checkEmailExists: true, isLoading: false, checkEmailExistsMess: res.message });
        }
      });
    } else {
      this.setState({ checkemail: false });
    }
    if (this.state.password.length > 5) {
      this.setState({ checkpassword: true });
      MySpinner.show();
      // registerPromise(this.state.email, this.state.password)
      //   .then(res => {
      //     this.props.registerSuccess(res, this, () => {
      //       const temp = {};
      //       temp.imei = DeviceInfo.getUniqueID();
      //       this.props.updateUserInfo(temp, () => {
      //       });
      //     });
      //   })
      //   .catch(e => {
      //     MySpinner.hide();
      //     alert(strings.alert, e);
      //   });
    } else {
      this.setState({ checkpassword: false });
      // alert(strings.alert, strings.password_lenght);
    }
  }
  render() {
    console.log('dauphaiphat: this.state.checkEmailExists', this.state.checkEmailExists);
    return (
      <KeyboardAwareScrollView behavior='padding' style={{ backgroundColor: 'white' }}>
        <BaseHeader
          noShadow
          translucent
          leftIcon='arrow-left'
          leftIconType='Feather'
          styleContent={{
            backgroundColor: 'transparent',
          }}
          onLeftPress={() => this.props.navigation.goBack()}
        />

        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Image
            style={{
              alignSelf: 'center',
              width: 65 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
            }}
            resizeMode='contain'
            source={require('../../assets/image/ic_register.png')}
          />
          <Text style={[style.titleHeader, { fontSize: FS(28), marginBottom: 22 * SCALE_RATIO_WIDTH_BASIS }]}>
            Create Account
          </Text>

          <View
            style={{
              width: (85 / 100) * DEVICE_WIDTH,
            }}
          >
            <Input
              containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              inputContainerStyle={{
                borderColor: APP_COLOR_TEXT,
                borderWidth: SCALE_RATIO_WIDTH_BASIS,
                marginVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS,
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              }}
              clearButtonMode='while-editing'
              rightIcon={{
                type: 'material',
                name: 'person-outline',
                color: '#999',
              }}
              placeholderTextColor='#999'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              label='Your name'
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              inputStyle={style.text}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}
              returnKeyType='next'
              onSubmitEditing={() => this.txtEmail.focus()}
            />
            <Input
              keyboardType='email-address'
              containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
              inputContainerStyle={{
                borderColor: APP_COLOR_TEXT,
                borderWidth: SCALE_RATIO_WIDTH_BASIS,
                marginVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS,
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              }}
              clearButtonMode='while-editing'
              // placeholder="Nhập từ khóa..."
              rightIcon={{ type: 'material', name: 'mail-outline', color: '#999' }}
              placeholderTextColor='#999'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              label='Email'
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              errorStyle={{ color: 'red' }}
              errorMessage={
                this.state.checkemail
                  ? ''
                  : this.state.checkEmailExists
                  ? this.state.checkEmailExistsMess
                  : strings.is_invalid_email
              }
              inputStyle={style.text}
              ref={instance => (this.txtEmail = instance)}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              keyboardType='email-address'
              returnKeyType='next'
              onSubmitEditing={() => this.txtPassword.focus()}
            />
            <Input
              rightIcon={{ type: 'material', name: 'lock-outline', color: '#999' }}
              secureTextEntry
              containerStyle={{ paddingLeft: 0, paddingRight: 0, marginTop: 10 * SCALE_RATIO_WIDTH_BASIS }}
              inputContainerStyle={{
                borderColor: APP_COLOR_TEXT,
                borderWidth: SCALE_RATIO_WIDTH_BASIS,
                marginVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS,
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              }}
              clearButtonMode='while-editing'
              // placeholder="Nhập từ khóa..."
              placeholderTextColor='#999'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              label='Password'
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.checkpassword ? '' : strings.password_lenght}
              inputStyle={style.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              returnKeyType='go'
              ref={instance => (this.txtPassword = instance)}
              onSubmitEditing={() => this.registerFunc()}
            />
            <CheckBox
              checkedColor={APP_COLOR}
              textStyle={style.text}
              containerStyle={{
                marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
                marginLeft: 0,
                marginRight: 0,
                padding: 0,
                margin: 0,
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
              title='I have read and agree to the terms of use'
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked })}
            />
            <Button
              // this.state.isLoading ||
              disabled={
                this.state.checked === false ||
                this.state.username === '' ||
                this.state.email === '' ||
                this.state.password === ''
              }
              onPress={() => this.registerFunc()}
              containerStyle={{
                width: (85 / 100) * DEVICE_WIDTH,
                marginTop: 20 * SCALE_RATIO_WIDTH_BASIS,
              }}
              disabledTitleStyle={[style.text, { color: APP_COLOR }]}
              type={
                this.state.checked === false ||
                this.state.username === '' ||
                this.state.email === '' ||
                this.state.password === ''
                  ? 'outline'
                  : 'solid'
              }
              disabledStyle={[
                {
                  height: 47 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: 'white',
                  borderColor: APP_COLOR,
                },
              ]}
              buttonStyle={[
                {
                  height: 47 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: APP_COLOR,
                },
              ]}
              titleStyle={[style.text, { color: 'white' }]}
              title='Create Account'
            />
            <Text style={[style.text, { textAlign: 'center', marginVertical: 25 * SCALE_RATIO_WIDTH_BASIS }]}>
              Already have account? <Text style={[style.textCaption, { fontSize: FS(14) }]}>Log in here</Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapActionCreators = {
  checkEmailExists,
};

const mapStateToProps = state => ({
  // userData: state.user.userData
});
export default connect(
  mapStateToProps,
  mapActionCreators
)(RegisterComponent);
