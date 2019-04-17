import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { DEVICE_HEIGHT, FS, SCALE_RATIO_WIDTH_BASIS, DEVICE_WIDTH, ROUTE_KEY } from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, {
  APP_COLOR,
  APP_COLOR_BLUE_2,
  APP_COLOR_TEXT,
  APP_COLOR_TEXT_GRAY_2,
  FONT,
  APP_COLOR_2,
  headerHeight,
} from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import BaseHeader from '../../view/BaseHeader';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { QRCode } from 'react-native-custom-qr-codes';
import moment from 'moment';

class DetailPaySucessComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, loadDone: false, dialogVisible: false };
    this.store = DATA_TEST;
    this.data = DATA_TEST;
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }

  render() {
    console.log('dauphaiphat: DetailPaySucessComponent -> render -> this.props.navigation', this.props.navigation);

    const { item, res } = this.props.navigation.state.params;

    return (
      <View
        style={{
          backgroundColor: APP_COLOR,
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          paddingTop: 20 + getStatusBarHeight(),
          paddingBottom: 20 + getBottomSpace(),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{ backgroundColor: APP_COLOR, width: DEVICE_WIDTH, height: DEVICE_HEIGHT, position: 'absolute' }}
        >
          <LinearGradient
            style={{
              top: DEVICE_WIDTH / 4,
              right: -(DEVICE_WIDTH * 0.1),
              width: DEVICE_WIDTH * 0.3,
              height: DEVICE_WIDTH * 0.3,
              borderRadius: DEVICE_WIDTH,
              position: 'absolute',
            }}
            start={{ x: 0.1, y: 0.75 }}
            end={{ x: 0.75, y: 0.25 }}
            colors={[`${APP_COLOR}90`, `${APP_COLOR_2}90`]}
          />
          <LinearGradient
            style={{
              top: DEVICE_WIDTH + 40,
              left: -(DEVICE_WIDTH * 0.12),
              width: DEVICE_WIDTH * 0.3,
              height: DEVICE_WIDTH * 0.3,
              borderRadius: DEVICE_WIDTH,
              position: 'absolute',
            }}
            start={{ x: 0.1, y: 0.75 }}
            end={{ x: 0.75, y: 0.25 }}
            colors={[`${APP_COLOR}90`, `${APP_COLOR_2}60`]}
          />
        </Animated.View>
        {/* <Image
          style={{
            position: 'absolute',
            top: -DEVICE_HEIGHT * 0.1,
            width: '100%',
          }}
          // source={require('../../assets/imgs/paydone.png')}
          resizeMode='contain'
        /> */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ height: DEVICE_HEIGHT / 2 }}>
          <View
            style={{
              height: DEVICE_HEIGHT / 2,
              flex: 1,
              paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                alignItems: 'center',
              }}
            >
              <MaterialCommunityIcons
                name='checkbox-marked-circle'
                style={{ marginTop: 5, marginRight: 5 }}
                size={20 * SCALE_RATIO_WIDTH_BASIS}
                color='#fff'
              />

              <Text style={[style.text, { fontSize: FS(20), color: '#fff' }]}>Order completed</Text>
            </View>
            <Text
              style={[
                style.textCaption,
                {
                  marginTop: 15,
                  fontSize: FS(24),
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: 30,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                style.textCaption,
                {
                  marginTop: 15,
                  fontSize: FS(16),
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: 30,
                },
              ]}
            >
              by {item.contactPerson}
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 50 * SCALE_RATIO_WIDTH_BASIS + getBottomSpace(),
            alignSelf: 'center',
            backgroundColor: '#fff',
            marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
            paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          <QRCode
            linearGradient={[APP_COLOR, APP_COLOR_2]}
            content={res.QR_code ? res.QR_code : item.qr_code}
            size={150 * SCALE_RATIO_WIDTH_BASIS}
          />
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginTop: 25,
              marginBottom: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <FontAwesome
                name='calendar'
                style={{ marginTop: 5 }}
                size={14 * SCALE_RATIO_WIDTH_BASIS}
                color={APP_COLOR_TEXT}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>
                  {moment(item.end_date).format('ddd,MMMM')}
                </Text>
                <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>
                  {item.start_time} - {item.end_time}:00
                </Text>
              </View>
            </View>
            <Text style={[style.text, { fontSize: FS(14), fontcolor: APP_COLOR_BLUE_2 }]}>+ Add</Text>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <FontAwesome
                name='calendar'
                style={{ marginTop: 5 }}
                size={14 * SCALE_RATIO_WIDTH_BASIS}
                color={APP_COLOR_TEXT}
              />
              <View style={{ marginLeft: 10, width: '80%' }}>
                <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>{item.locationName}</Text>
                <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>{item.address}</Text>
              </View>
            </View>
            <Text style={[style.text, { fontSize: FS(14), fontcolor: APP_COLOR_BLUE_2 }]}> View</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 10 * SCALE_RATIO_WIDTH_BASIS + getBottomSpace(),
            alignSelf: 'center',
            backgroundColor: '#fff',
            marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
            paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignItems: 'center',
          }}
          onPress={() => this.props.navigation.navigate(ROUTE_KEY.MAIN)}
        >
          <Text
            style={[
              style.textCaption,
              {
                fontFamily: FONT.Bold,
                fontSize: FS(14),
                color: APP_COLOR,
              },
            ]}
          >
            Continue Reading
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailPaySucessComponent);
