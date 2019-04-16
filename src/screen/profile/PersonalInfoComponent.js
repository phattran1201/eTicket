import { DatePicker, Form, Input, Item, Label } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
} from '../../constants/Constants';
import strings from '../../constants/Strings';
import style, { APP_COLOR, APP_COLOR_TEXT } from '../../constants/style';
import { alert } from '../../utils/alert';
import BaseHeader from '../../view/BaseHeader';
import MyComponent from '../../view/MyComponent';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { updateUserData, loadUserData } from './PersonalInfoActions';
import MySpinner from '../../view/MySpinner';

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
      gender: gender === null ? 'Other' : gender,
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
  }
  onPlaceSearch = (data, details) => {
    console.log('dauphaiphat: PersonalInfoComponent -> onPlaceSearch -> data', data);
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
    // MySpinner.show();
    this.props.updateUserData(first_name, last_name, dob, phone_number, gender, address, () =>
      this.props.loadUserData(this.props.token)
    );
    // .then(res => {})
    // .catch(err => {
    //   MySpinner.hide();
    // });
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
      <KeyboardAwareScrollView style={{ backgroundColor: '#fff' }}>
        <BaseHeader
          noShadow
          translucent
          children={
            <Text style={[style.titleHeader, { alignSelf: 'center', textAlign: 'center' }]}>THÔNG TIN CÁ NHÂN</Text>
          }
          styleContent={{
            position: 'absolute',
            backgroundColor: 'transparent',
            zIndex: 99999,
          }}
          rightIcon='account-edit'
          rightIconType='MaterialCommunityIcons'
          rightIconStyle={{ color: APP_COLOR_TEXT }}
          onRightPress={() => this.updateUserData()}
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
              <Label style={style.textInput}>First name</Label>
              <Input
                style={style.textInput}
                value={first_name}
                onChangeText={value => this.setState({ first_name: value })}
                placeholder='First name..'
              />
            </Item>
            <Item stackedLabel style={{ width: '48%' }}>
              <Label style={style.textInput}>Last name</Label>
              <Input
                style={style.textInput}
                value={last_name}
                onChangeText={value => this.setState({ last_name: value })}
                placeholder='Last name..'
              />
            </Item>
          </View>
          <Item stackedLabel>
            <Label style={style.textInput}>Birthday</Label>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              <DatePicker
                defaultDate={new Date(1995, 1, 10)}
                minimumDate={new Date(1990, 1, 1)}
                maximumDate={new Date()}
                locale={'en'}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={'fade'}
                androidMode={'default'}
                // placeHolderText="Select date"
                textStyle={[style.textInput, { marginLeft: -10 }]}
                placeHolderTextStyle={{ color: '#d3d3d3' }}
                onDateChange={date => this.setState({ dob: date })}
              />
              <EvilIcons size={FS(20)} name='calendar' type='evilicon' color={APP_COLOR} />
            </View>
          </Item>
          <Item stackedLabel>
            <Label style={style.textInput}>Phone number</Label>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              <Input
                keyboardType='number-pad'
                style={style.textInput}
                value={phone_number}
                onChangeText={value => this.setState({ phone_number: value })}
                placeholder='Phone number...'
              />
              <EvilIcons size={FS(20)} name='check' type='evilicon' color='green' />
            </View>
          </Item>

          <Item stackedLabel>
            <Label style={style.textInput}>Email</Label>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
            >
              <Input
                style={style.textInput}
                value={email}
                onChangeText={value => this.setState({ email: value })}
                placeholder='Email...'
                disabled
              />
              <EvilIcons size={FS(20)} name='check' type='evilicon' color='green' />
            </View>
          </Item>
          <Item stackedLabel>
            <Label style={style.textInput}>Gender</Label>
            <View
              style={{
                marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
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
                containerStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                title='Male'
                checked={this.state.sex === 'Male'}
                onPress={() => this.setState({ sex: 'Male' })}
              />
              <CheckBox
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={APP_COLOR}
                textStyle={style.text}
                containerStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                title='Female'
                checked={this.state.sex === 'Female'}
                onPress={() => this.setState({ sex: 'Female' })}
              />
              <CheckBox
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor={APP_COLOR}
                textStyle={style.text}
                containerStyle={{
                  marginLeft: 0,
                  marginRight: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                }}
                title='Other'
                checked={this.state.sex === 'Other'}
                onPress={() => this.setState({ sex: 'Other' })}
              />
            </View>

            {/* <Dropdown
              containerStyle={{ width: '100%' }}
              pickerStyle={{
                width: 100 * SCALE_RATIO_WIDTH_BASIS,
                borderColor: Platform.OS === 'ios' ? '#9297D330' : '#70707010',
                borderWidth: 1,
                flexDirection: 'row',
                borderRadius: 10 * SCALE_RATIO_WIDTH_BASIS,
                borderBottomRightRadius: 0,
              }}
              overlayStyle={{ borderTopRightRadius: 0 }}
              textColor={APP_COLOR_TEXT}
              fontSize={FS(12)}
              value={this.state.sex}
              itemTextStyle={style.textInput}
              dropdownOffset={{
                top: -5 * SCALE_RATIO_WIDTH_BASIS,
                left: DEVICE_WIDTH - 110 * SCALE_RATIO_WIDTH_BASIS,
              }}
              data={[
                {
                  value: 'MALE',
                  onSelect: onDone => {
                    this.setState({ sex: 'MALE' });
                  },
                },
                {
                  value: 'FEMALE',
                  onSelect: onDone => {
                    this.setState({ sex: 'FEMALE' });
                  },
                },
                {
                  value: 'ALL',
                  onSelect: onDone => {
                    this.setState({ sex: 'ALL' });
                  },
                },
              ]}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Input style={style.textInput} value={this.state.sex} disabled />

                <EvilIcons size={FS(20)} name='chevron-down' type='evilicon' color='green' />
              </View>
            </Dropdown>
          */}
          </Item>
          <Item stackedLabel>
            <Label style={style.textInput}>Địa chỉ mặc định</Label>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
              <GooglePlacesAutocomplete
                getDefaultValue={() => this.state.address}
                currentLocationLabel={this.state.address}
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
                      <Text style={style.textInput}>{row.structured_formatting.main_text}</Text>
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
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    borderTopColor: 'rgba(0,0,0,0)',
                    borderBottomColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                  },
                  textInput: {
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
                    borderTopColor: 'rgba(0,0,0,0)',
                    borderBottomColor: 'rgba(0,0,0,0)',
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
        <TouchableOpacity
          onPress={() => alert(strings.alert, strings.log_out)}
          outline
          width={150 * SCALE_RATIO_WIDTH_BASIS}
          style={{
            // marginRight: 18 * SCALE_RATIO_WIDTH_BASIS,
            marginTop: 18 * SCALE_RATIO_WIDTH_BASIS,
            alignSelf: 'center',
          }}
        >
          <Text> {strings.log_out}</Text>
        </TouchableOpacity>
        <Text
          style={[
            style.text,
            {
              marginTop: 18 * SCALE_RATIO_WIDTH_BASIS,
              color: '#b6bbbf',
              textAlign: 'center',
              paddingBottom: 40 * SCALE_RATIO_HEIGHT_BASIS,
            },
          ]}
        >
          Phiên bản 1.1.23.34
        </Text>
      </KeyboardAwareScrollView>
    );
  }
}
const mapActionCreators = { updateUserData, loadUserData };

const mapStateToProps = state => ({
  token: state.user.token,
  userData: state.user.userData,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(PersonalInfoComponent);
