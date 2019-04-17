import { DatePicker, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View, PixelRatio, ActivityIndicator } from 'react-native';
import { Avatar, CheckBox } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import { connect } from 'react-redux';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FS,
  SCALE_RATIO_HEIGHT_BASIS,
  SCALE_RATIO_WIDTH_BASIS,
  ROUTE_KEY,
} from '../../constants/Constants';
import strings from '../../constants/Strings';
import style, {
  APP_COLOR,
  APP_COLOR_TEXT,
  APP_COLOR_BLUE_2,
  FONT,
  APP_COLOR_2,
  APP_COLOR_BORDER,
  APP_COLOR_TEXT_BORDER,
} from '../../constants/style';
import { alert } from '../../utils/alert';
import BaseHeader from '../../view/BaseHeader';
import MyComponent from '../../view/MyComponent';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateUserData, loadUserData } from './PersonalInfoActions';
import MySpinner from '../../view/MySpinner';
import background from '../../assets/background.png';
import { logout } from '../login/LoginActions';
import { getBottomSpace } from 'react-native-iphone-x-helper';

class PersonalInfoComponent extends MyComponent {
  constructor(props) {
    super(props);
    const {
      address,
      bio,
      cash,
      companyName,
      created_at,
      dob,
      email,
      first_name,
      flag,
      gender,
      id,
      imageURL,
      last_login,
      last_name,
      permissions,
      phone_number,
      post_code,
      status,
      updated_at,
    } = this.props.userData;
    this.state = {
      isLoading: false,
      showUpdate: false,
      chosenDate: new Date(),
      dialogVisible: '',
      tagAddressLocation: '',
      address,
      bio,
      cash,
      companyName,
      created_at,
      dob,
      email,
      first_name,
      flag,
      gender,
      id,
      imageURL,
      last_login,
      last_name,
      permissions,
      phone_number,
      post_code,
      status,
      updated_at,
    };

    this.baseState = this.state;
  }

  onPlaceSearch = (data, details) => {
    this.setState({
      address: data.description,
      tagAddressLocation: details.geometry.location,
    });
  };
  updateUserData() {
    const {
      address,
      bio,
      cash,
      companyName,
      created_at,
      dob,
      email,
      first_name,
      flag,
      gender,
      id,
      imageURL,
      last_login,
      last_name,
      permissions,
      phone_number,
      post_code,
      status,
      updated_at,
    } = this.state;
    MySpinner.show();
    this.setState({ isLoading: true });
    this.props.updateUserData(
      first_name,
      last_name,
      dob,
      phone_number,
      gender,
      address,
      () => {
        this.props.loadUserData(this.props.token);
        this.setState({ showUpdate: false, isLoading: false });
        MySpinner.hide();
        setTimeout(() => alert(strings.alert, 'Updated successfully'), 100);
      },
      () => {
        this.setState({ isLoading: false });
        alert(strings.alert, 'Updated false');
      }
    );
  }
  render() {
    console.log('dauphaiphat: PersonalInfoComponent -> render -> userData', this.props.userData);
    const {
      address,
      bio,
      cash,
      companyName,
      created_at,
      dob,
      email,
      first_name,
      flag,
      gender,
      id,
      imageURL,
      last_login,
      last_name,
      permissions,
      phone_number,
      post_code,
      status,
      updated_at,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ backgroundColor: '#fff' }}>
          <BaseHeader
            noShadow
            translucent
            children={
              <Text style={[style.titleHeader, { alignSelf: 'center', textAlign: 'center' }]}>
                PERSONAL INFORMATION
              </Text>
            }
            styleContent={{
              position: 'absolute',
              backgroundColor: 'transparent',
              zIndex: 99999,
            }}
            rightIcon={this.state.showUpdate ? 'content-save' : 'account-edit'}
            rightIconType='MaterialCommunityIcons'
            rightIconStyle={{ color: APP_COLOR_TEXT }}
            btnRightStyle={{ backgroundColor: 'white', padding: 5 }}
            onRightPress={() => this.setState({ showUpdate: true })}
          />
          <FastImage
            style={{
              zIndex: -1,
              width: DEVICE_WIDTH,
              height: (20 / 100) * DEVICE_HEIGHT,
              position: 'absolute',
            }}
            removeClippedSubviews
            source={{
              uri: 'https://i.pinimg.com/originals/81/f1/8d/81f18dbd8bef71772d6db3b379101310.jpg',
            }}
            defaultSource={null}
          />

          <View
            style={[
              style.shadow,
              {
                backgroundColor: '#fff',
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
                marginTop: (16 / 100) * DEVICE_HEIGHT,
                paddingBottom: 20 * SCALE_RATIO_HEIGHT_BASIS,
              },
            ]}
          >
            <View style={{ marginTop: (-80 * SCALE_RATIO_WIDTH_BASIS) / 2 }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 110 * SCALE_RATIO_WIDTH_BASIS,
                  height: 110 * SCALE_RATIO_WIDTH_BASIS,
                  padding: 20 * SCALE_RATIO_WIDTH_BASIS,
                  borderRadius: (110 * SCALE_RATIO_WIDTH_BASIS) / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              >
                <Avatar
                  // imageProps={{ resizeMode: 'contain' }}
                  source={{
                    uri: 'https://kenh14cdn.com/2017/1-1506422137960.jpg',
                  }}
                  rounded
                  showEditButton
                  size={90 * SCALE_RATIO_WIDTH_BASIS}
                  containerStyle={style.shadow}
                  editButton={{
                    size: 20 * SCALE_RATIO_WIDTH_BASIS,
                    name: 'camera',
                    type: 'evilicon',
                    color: APP_COLOR,
                    style: {
                      backgroundColor: '#fff',
                      width: 25 * SCALE_RATIO_WIDTH_BASIS,
                      height: 25 * SCALE_RATIO_WIDTH_BASIS,
                      // borderRadius: (25 * SCALE_RATIO_WIDTH_BASIS) / 2
                    },
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10 * SCALE_RATIO_HEIGHT_BASIS,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name='attach-money' size={FS(30)} color='#707070' style={{ alignSelf: 'center' }} />
              <Text style={[style.titleHeader, { fontSize: FS(20) }]}>{cash}</Text>
            </View>
          </View>
          <Form
            style={{
              paddingLeft: 5 * SCALE_RATIO_WIDTH_BASIS,
              paddingRight: 25 * SCALE_RATIO_WIDTH_BASIS,
              paddingVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Item stackedLabel style={{ width: '48%' }}>
                <Label style={[style.text, { fontFamily: FONT.Medium }]}>First name</Label>
                <Input
                  disabled={!this.state.showUpdate}
                  style={style.text}
                  value={first_name}
                  onChangeText={value => this.setState({ first_name: value })}
                  placeholder='First name..'
                />
              </Item>
              <Item stackedLabel style={{ width: '48%' }}>
                <Label style={[style.text, { fontFamily: FONT.Medium }]}>Last name</Label>
                <Input
                  disabled={!this.state.showUpdate}
                  style={style.text}
                  value={last_name}
                  onChangeText={value => this.setState({ last_name: value })}
                  placeholder='Last name..'
                />
              </Item>
            </View>
            <Item stackedLabel>
              <Label style={[style.text, { fontFamily: FONT.Medium, paddingBottom: 8 }]}>Birthday</Label>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
              >
                <DatePicker
                  disabled={!this.state.showUpdate}
                  defaultDate={new Date(1995, 1, 10)}
                  minimumDate={new Date(1990, 1, 1)}
                  maximumDate={new Date()}
                  locale={'en'}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  // placeHolderText="Select date"
                  textStyle={[style.text, { marginLeft: -10 }]}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  onDateChange={date => this.setState({ dob: date })}
                />
                <EvilIcons size={FS(20)} name='calendar' type='evilicon' color={APP_COLOR} />
              </View>
            </Item>
            <Item stackedLabel>
              <Label style={[style.text, { fontFamily: FONT.Medium }]}>Phone number</Label>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
              >
                <Input
                  disabled={!this.state.showUpdate}
                  keyboardType='number-pad'
                  style={style.text}
                  value={phone_number}
                  onChangeText={value => this.setState({ phone_number: value })}
                  placeholder='Phone number...'
                />
                <EvilIcons size={FS(20)} name='check' type='evilicon' color='green' />
              </View>
            </Item>

            <Item stackedLabel>
              <Label style={[style.text, { fontFamily: FONT.Medium }]}>Email</Label>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
              >
                <Input
                  style={style.text}
                  value={email}
                  onChangeText={value => this.setState({ email: value })}
                  placeholder='Email...'
                  disabled
                />
                <EvilIcons size={FS(20)} name='check' type='evilicon' color='green' />
              </View>
            </Item>
            <Item stackedLabel>
              <Label style={[style.text, { fontFamily: FONT.Medium, paddingBottom: 12 }]}>Gender</Label>
              <View
                style={{
                  flex: 1,
                  width: DEVICE_WIDTH - 60 * SCALE_RATIO_WIDTH_BASIS,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor={APP_COLOR}
                  textStyle={style.text}
                  titleProps={{ style: [style.text, {}] }}
                  containerStyle={{
                    marginLeft: 0,
                    marginRight: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                  }}
                  title='Male'
                  checked={this.state.gender === 1}
                  onPress={() => (this.state.showUpdate ? this.setState({ gender: 1 }) : {})}
                />
                <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor={APP_COLOR}
                  textStyle={style.text}
                  titleProps={{ style: [style.text, {}] }}
                  containerStyle={{
                    marginLeft: 0,
                    marginRight: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                  }}
                  title='Female'
                  checked={this.state.gender === 0}
                  onPress={() => (this.state.showUpdate ? this.setState({ gender: 0 }) : {})}
                />
                <CheckBox
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checkedColor={APP_COLOR}
                  textStyle={style.text}
                  titleProps={{ style: [style.text, {}] }}
                  containerStyle={{
                    marginLeft: 0,
                    marginRight: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                  }}
                  title='Other'
                  checked={this.state.gender !== 0 && this.state.gender !== 1}
                  onPress={() => (this.state.showUpdate ? this.setState({ gender: '' }) : {})}
                />
              </View>
            </Item>
            <Item stackedLabel>
              <Label style={[style.text, { fontFamily: FONT.Medium, paddingBottom: 8 }]}>Địa chỉ mặc định</Label>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <GooglePlacesAutocomplete
                  editable={this.state.showUpdate}
                  getDefaultValue={() => (this.state.address === null ? '' : this.state.address)}
                  // currentLocationLabel={this.state.address}
                  onPress={(data, details) => {
                    this.onPlaceSearch(data, details);
                  }}
                  isRowScrollable={false}
                  enablePoweredByContainer={false}
                  placeholder={strings.search_place}
                  // placeholderTextColor="#fff"
                  listViewDisplayed={false}
                  fetchDetails
                  renderRow={row => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <MaterialIcons name='place' size={FS(12)} color='#707070' style={{ alignSelf: 'center' }} />

                      <View style={{ justifyContent: 'center', marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS }}>
                        <Text style={style.text}>{row.structured_formatting.main_text}</Text>
                        <Text style={style.text}>{row.structured_formatting.secondary_text} </Text>
                      </View>
                    </View>
                  )}
                  query={{
                    // components: 'country:vi',
                    key: 'AIzaSyAUYfbKtctkIibOgFnNN2x9Xg9i0sVxlhQ',
                    language: 'vi',
                  }}
                  styles={{
                    textInputContainer: {
                      backgroundColor: 'transparent',
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textContainer: {
                      width: '100%',
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      borderTopColor: 'transparent',
                      borderBottomColor: 'transparent',
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    text: {
                      width: '100%',
                      fontSize: FS(14),
                      borderWidth: 0,
                      paddingLeft: 0,
                      marginLeft: 0,
                      paddingRight: 0,
                      marginRight: 0,
                      // borderRadius: 25
                    },
                    listView: {
                      backgroundColor: 'white',
                      width: '100%',
                      borderTopColor: 'transparent',
                      borderBottomColor: 'transparent',
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    separator: {
                      backgroundColor: 'transparent',
                    },
                  }}
                  nearbyPlacesAPI={'GooglePlacesSearch'}
                  GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    typles: 'country',
                  }}
                  renderRightButton={() => (
                    <EvilIcons
                      size={FS(20)}
                      name='chevron-right'
                      type='evilicon'
                      color='green'
                      style={{
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  )}
                />
              </View>
            </Item>
          </Form>
          {this.state.showUpdate ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 10 * SCALE_RATIO_HEIGHT_BASIS + 2 * getBottomSpace(),
              }}
            >
              <TouchableOpacity
                disabled={this.state.isLoading}
                onPress={() => {
                  this.updateUserData();
                }}
                style={{
                  backgroundColor: APP_COLOR,
                  borderWidth: 5 / PixelRatio.get(),
                  borderColor: APP_COLOR,
                  borderRadius: 30 * SCALE_RATIO_WIDTH_BASIS,
                  marginRight: 10 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                  alignSelf: 'center',
                }}
              >
                {this.state.isLoading ? (
                  <ActivityIndicator size='small' style={{ alignSelf: 'center' }} color='white' />
                ) : (
                  <Text style={[style.text, { color: 'white' }]}>Update</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState(this.baseState);
                }}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 5 / PixelRatio.get(),
                  borderColor: APP_COLOR_BORDER,
                  borderRadius: 30 * SCALE_RATIO_WIDTH_BASIS,
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                  alignSelf: 'center',
                }}
              >
                <Text style={[style.text, { color: APP_COLOR_TEXT_BORDER }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ paddingBottom: getBottomSpace() }}>
              <TouchableOpacity
                onPress={() => this.props.logout(() => this.props.navigation.replace(ROUTE_KEY.PRE_LOGIN))}
                outline
                width={150 * SCALE_RATIO_WIDTH_BASIS}
                style={{
                  backgroundColor: 'white',
                  borderWidth: 5 / PixelRatio.get(),
                  borderColor: APP_COLOR_BORDER,
                  borderRadius: 30 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                  alignSelf: 'center',
                }}
              >
                <Text style={[style.text, { color: APP_COLOR_TEXT_BORDER }]}> {strings.log_out}</Text>
              </TouchableOpacity>
              <Text
                style={[
                  style.text,
                  {
                    marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
                    color: '#b6bbbf',
                    textAlign: 'center',
                    paddingBottom: 10 * SCALE_RATIO_HEIGHT_BASIS + getBottomSpace(),
                  },
                ]}
              >
                Version 0.1
              </Text>
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const mapActionCreators = { updateUserData, loadUserData, logout };

const mapStateToProps = state => ({
  token: state.user.token,
  userData: state.user.userData,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(PersonalInfoComponent);
