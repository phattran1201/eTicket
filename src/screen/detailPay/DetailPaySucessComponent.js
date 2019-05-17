import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
  DEVICE_HEIGHT,
  FS,
  SCALE_RATIO_WIDTH_BASIS,
  DEVICE_WIDTH,
  ROUTE_KEY,
  SCALE_RATIO_HEIGHT_BASIS,
} from '../../constants/Constants';
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
import Modal from 'react-native-modal';
import MySpinner from '../../view/MySpinner';
import { destroyTicket } from './DetailPayAction';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';
import { loadUserData } from '../profile/PersonalInfoActions';
import { resetTicket } from '../ticket/TicketActions';
import { loadListCategory } from '../splash/SplashActions';
import { loadListPopularEvents, loadListInWeekEvents, loadListFreeEvents } from '../home/HomeActions';

class DetailPaySucessComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, loadDone: false, dialogVisible: false };
    this.store = DATA_TEST;
    this.data = DATA_TEST;
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }
  destroyTicket(id) {
    MySpinner.show();
    destroyTicket(this.props.token, id)
      .then(res => {
        if (res.status === 'error') {
          MySpinner.hide();
          setTimeout(() => {
            alert(strings.alert, res.message);
          }, 100);
        } else {
          this.props.loadUserData(this.props.token);
          this.props.resetTicket(1);
          this.props.loadListCategory();
          this.props.loadListPopularEvents();
          this.props.loadListInWeekEvents();
          this.props.loadListFreeEvents();
          this.props.navigation.navigate(ROUTE_KEY.MAIN);
          MySpinner.hide();
        }
      })
      .catch(err => {
        // console.log('phat: DetailPaySucessComponent -> destroyTicket -> err', err);
        MySpinner.hide();
        alert(strings.alert, 'Ticket Destroy failed');
      });
  }
  render() {
    const { item, res } = this.props.navigation.state.params;
    // console.log('phat: DetailPaySucessComponent -> render -> item', item);
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
        <Modal
          onBackdropPress={() => this.setState({ dialogVisible: false })}
          onSwipe={() => this.setState({ dialogVisible: false })}
          swipeDirection={'down'}
          swipeThreshold={20}
          visible={this.state.dialogVisible}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR_TEXT_GRAY_2,
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 30 * SCALE_RATIO_WIDTH_BASIS,
              paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
              // width: DEVICE_WIDTH * 0.7,
              // height: DEVICE_WIDTH * 0.7,
              backgroundColor: 'white',
            }}
          >
            <Text style={[style.textCaption, { fontSize: FS(24), textAlign: 'center' }]}>Opps! </Text>
            <Text
              style={[
                style.text,
                { fontSize: FS(12), textAlign: 'center', marginVertical: 15 * SCALE_RATIO_WIDTH_BASIS },
              ]}
            >
              Do you really want to cancel the ticket
            </Text>
            <Text
              style={[style.text, { fontSize: FS(8), textAlign: 'center', marginBottom: 15 * SCALE_RATIO_WIDTH_BASIS }]}
            >
              P/s: Before the 3 day event tickets may be cancelled
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 20 * SCALE_RATIO_WIDTH_BASIS,
                  marginRight: 10 * SCALE_RATIO_WIDTH_BASIS,

                  backgroundColor: '#fff',
                  borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                }}
                onPress={() => {}}
              >
                <Text
                  onPress={() => {
                    this.setState({ dialogVisible: false });
                  }}
                  style={[
                    style.text,
                    {
                      textAlign: 'center',
                      fontSize: FS(14),
                      color: APP_COLOR_TEXT,
                    },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,

                  backgroundColor: APP_COLOR,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 30 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                }}
                onPress={() => this.destroyTicket(item.id)}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      textAlign: 'center',
                      fontFamily: FONT.Bold,
                      fontSize: FS(14),
                      color: '#fff',
                    },
                  ]}
                >
                  Destroy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
          <Text
            style={[
              style.textCaption,
              {
                paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,

                marginTop: 15,
                fontSize: FS(20),
                color: APP_COLOR_TEXT,
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
                paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,

                marginTop: 15,
                fontSize: FS(14),
                color: APP_COLOR_TEXT,
                textAlign: 'center',
                lineHeight: 30,
                marginBottom: 10 * SCALE_RATIO_HEIGHT_BASIS,
              },
            ]}
          >
            by {item.contactPerson}
          </Text>
          <QRCode
            linearGradient={[APP_COLOR, APP_COLOR_2]}
            content={res.QR_code ? res.QR_code : item.qr_code}
            size={150 * SCALE_RATIO_WIDTH_BASIS}
          />
          {moment()
            .add(3, 'days')
            .format('YYYY-MM-DD HH:mm:ss') < moment(item.end_date).format('YYYY-MM-DD HH:mm:ss') && (
            <Text
              onPress={() => this.setState({ dialogVisible: true })}
              style={[
                style.textModal,
                {
                  marginTop: 10,
                  marginBottom: -10,
                  // color: 'white',
                  // position: 'absolute',
                  textAlign: 'center',
                  // right: 20 * SCALE_RATIO_WIDTH_BASIS,
                  // top: 20 * SCALE_RATIO_HEIGHT_BASIS + getStatusBarHeight(),
                },
              ]}
            >
              Cancellation of tickets
            </Text>
          )}
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

const mapActionCreators = {
  loadUserData,
  resetTicket,
  loadListCategory,
  loadListPopularEvents,
  loadListInWeekEvents,
  loadListFreeEvents,
};

const mapStateToProps = state => ({ token: state.user.token, userData: state.user.userData });

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailPaySucessComponent);
