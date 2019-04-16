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
import { Input, Button } from 'react-native-elements';
import { loginEmailPromise, loginSuccess } from './LoginActions';
import { loadUserData } from '../profile/PersonalInfoActions';

const loginBackground = require('../../assets/background.png');

class LoginComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: 'phattran1201@gmail.com',
      password: '123456',
      isLoading: false,
      checkemail: true,
      checkpassword: true,
      btnLogin: 'Log in',
    };
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  loginFunction() {
    MySpinner.show();
    this.setState({ isLoading: true });

    if (this.validateEmail(this.state.email)) {
      this.setState({ checkemail: true });
    } else {
      MySpinner.hide();

      this.setState({ checkemail: false, isLoading: false });
    }
    if (this.state.password.length > 5) {
      this.setState({ checkpassword: true });
    } else {
      MySpinner.hide();
      this.setState({ checkpassword: false, isLoading: false });
    }
    loginEmailPromise(this.state.email, this.state.password)
      .then(res => {
        this.props.loginSuccess(res, () => {
          this.props.loadUserData(res.data.access_token);
          this.setState({ isLoading: false, btnLogin: 'Log in Success' });
          setTimeout(() => {
            this.props.navigation.replace(ROUTE_KEY.MAIN);
          }, 500);
          MySpinner.hide();
        });
      })
      .catch(err => {
        MySpinner.hide();
        this.setState({ isLoading: false });
      });
  }

  render() {
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
            // justifyContent: 'center',
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
            source={require('../../assets/image/ic_login.png')}
          />
          <Text style={[style.titleHeader, { fontSize: FS(28), marginBottom: 22 * SCALE_RATIO_WIDTH_BASIS }]}>
            Log in to eTicket
          </Text>
          <Text style={[style.text, { textAlign: 'center', marginBottom: 25 * SCALE_RATIO_WIDTH_BASIS }]}>
            Connect with us to not miss your favorite event
          </Text>

          <View
            style={{
              width: (85 / 100) * DEVICE_WIDTH,
            }}
          >
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
              rightIcon={{ type: 'material', name: 'mail-outline', color: '#999' }}
              placeholderTextColor='#999'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              label='Email'
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.checkemail ? '' : strings.is_invalid_email}
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
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
              placeholderTextColor='#999'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              label='Password'
              errorStyle={{ color: 'red' }}
              errorMessage={this.state.checkpassword ? '' : strings.password_lenght}
              labelStyle={[style.text, { color: APP_COLOR_TEXT }]}
              inputStyle={style.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              returnKeyType='go'
              ref={instance => (this.txtPassword = instance)}
              onSubmitEditing={() => this.loginFunction()}
            />
            <Button
              loading={this.state.isLoading}
              disabled={this.state.email === '' || this.state.password === ''}
              // disabledTitleStyle={[style.text, { color: APP_COLOR }]}
              // type={this.state.email === '' || this.state.password === '' ? 'outline' : 'solid'}
              // disabledStyle={[
              //   {
              //     height: 47 * SCALE_RATIO_WIDTH_BASIS,
              //     borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              //     paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
              //     paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
              //     backgroundColor: 'white',
              //     borderColor: APP_COLOR
              //   }]}
              onPress={() => this.loginFunction()}
              containerStyle={{
                width: (85 / 100) * DEVICE_WIDTH,
                marginTop: 20 * SCALE_RATIO_WIDTH_BASIS,
              }}
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
              title={this.state.btnLogin}
            />
            <Button
              onPress={() => this.props.navigation.navigate(ROUTE_KEY.REGISTER)}
              containerStyle={{
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
                width: (85 / 100) * DEVICE_WIDTH,
                marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
              }}
              type='outline'
              buttonStyle={[
                {
                  height: 47 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 8 * SCALE_RATIO_HEIGHT_BASIS,
                  paddingHorizontal: 25 * SCALE_RATIO_WIDTH_BASIS,
                  backgroundColor: 'white',
                  borderColor: APP_COLOR,
                },
              ]}
              titleStyle={[style.text, { color: APP_COLOR }]}
              title='Create account'
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapActionCreators = {
  loginSuccess,
  loadUserData,
};

const mapStateToProps = state => ({
  // userData: state.user.userData
});
export default connect(
  mapStateToProps,
  mapActionCreators
)(LoginComponent);
