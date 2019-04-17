import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { FS, SCALE_RATIO_WIDTH_BASIS, ROUTE_KEY } from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, { APP_COLOR, APP_COLOR_BLUE_2, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY_2, FONT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import { buyTicket } from './DetailPayAction';
import MySpinner from '../../view/MySpinner';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';
import moment from 'moment';

class DetailEventPayComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { dialogVisible: false, type_id: null };
  }
  buyTicket() {
    const { item } = this.props.navigation.state.params;
    MySpinner.show();
    buyTicket(this.props.token, item.id, this.state.type_id)
      .then(res => {
        this.props.navigation.navigate(ROUTE_KEY.DETAIL_PAY_SUCESS, {
          item,
          res,
        });
        this.setState({ isLoading: false, btnLogin: 'Log in Success' });
        MySpinner.hide();
      })
      .catch(err => {
        MySpinner.hide();
        this.setState({ isLoading: false });
        alert(strings.alert, 'Ticket purchase failed');
      });
  }
  render() {
    const { item } = this.props.navigation.state.params;
    console.log('dauphaiphat: DetailEventPayComponent -> render -> item', item);

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          iconColor='#fff'
          bodyTitle='Ticket Detail'
          showGardient
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS }}>
            <Text
              style={[
                style.textCaption,
                {
                  fontSize: FS(18),
                  color: APP_COLOR_TEXT,
                  // textDecorationLine: 'underline',
                  // letterSpacing: 3,
                  lineHeight: 30,
                },
              ]}
            >
              {item.title}
            </Text>
            <Text style={[style.text, { fontSize: FS(12), color: APP_COLOR_TEXT, marginTop: 10, marginLeft: 5 }]}>
              By {item.contactPerson}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15,
            }}
          >
            <View style={{ width: FS(18), alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome
                name='user'
                style={{ marginTop: FS(5), alignSeft: 'center' }}
                size={FS(17)}
                color={APP_COLOR_TEXT_GRAY_2}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>{item.contactPerson}</Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>
                {item.contactNumber}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15,
            }}
          >
            <View style={{ width: FS(18), alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome
                name='calendar'
                style={{ marginTop: FS(5), alignSeft: 'center' }}
                size={FS(17)}
                color={APP_COLOR_TEXT_GRAY_2}
              />
            </View>

            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>
                {moment(item.end_date).format('ddd,MMMM')}
                {'  '}
                {item.start_time} - {item.end_time}:00
              </Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>{item.type}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15,
            }}
          >
            <View style={{ width: FS(18), alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome
                name='map-marker'
                style={{ marginTop: FS(5), alignSeft: 'center' }}
                size={FS(17)}
                color={APP_COLOR_TEXT_GRAY_2}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>{item.locationName}</Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>{item.address}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15,
            }}
          >
            <View style={{ width: FS(18), alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome
                name='ticket'
                style={{ marginTop: FS(5), alignSeft: 'center' }}
                size={FS(17)}
                color={APP_COLOR_TEXT_GRAY_2}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>Select the type of ticket</Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>
                Pay free tickets within 3 days before the event
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
            {item &&
              item.tickettype &&
              item.tickettype.data &&
              item.tickettype.data
                .sort((a, b) => a.price - b.price)
                .map((item2, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.setState({ type_id: item2.id })}
                      style={{
                        // width: 100 * SCALE_RATIO_WIDTH_BASIS,
                        marginLeft: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: item2.id === this.state.type_id ? APP_COLOR : APP_COLOR_BLUE_2,
                        backgroundColor: item2.id === this.state.type_id ? APP_COLOR : 'white',
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 4,
                      }}
                    >
                      <Text
                        style={[
                          style.text,
                          { fontSize: FS(10), color: item2.id === this.state.type_id ? '#fff' : APP_COLOR_BLUE_2 },
                        ]}
                      >
                        {item2.name}
                      </Text>
                      <Text
                        style={[
                          style.text,
                          {
                            fontFamily: FONT.Bold,
                            fontSize: FS(12),
                            color: item2.id === this.state.type_id ? '#fff' : APP_COLOR_BLUE_2,
                          },
                        ]}
                      >
                        {item2.price < 0.1 ? 'Free' : item2.price}
                      </Text>
                      <Text
                        style={[
                          style.text,
                          { fontSize: FS(10), color: item2.id === this.state.type_id ? '#fff' : APP_COLOR_BLUE_2 },
                        ]}
                      >
                        QTY: {item2.total - item2.ticket_bought}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
          </View>
          <View
            style={{
              marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
            <View
              style={{
                marginLeft: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#70707020',
                backgroundColor: '#70707020',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 4,
              }}
            >
              <Text style={[style.text, { fontSize: FS(12) }]}>
                Tickets include event attendance and drinking water. No presentation slides.
              </Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignSelf: 'center',
            borderWidth: 1,
            borderColor: this.state.type_id === null ? APP_COLOR_BLUE_2 : APP_COLOR,
            backgroundColor: this.state.type_id === null ? 'white' : APP_COLOR,
            marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
            paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignItems: 'center',
          }}
          disabled={this.state.type_id === null}
          onPress={() => this.buyTicket()}
        >
          <Text
            style={[
              style.textCaption,
              {
                fontFamily: FONT.Bold,
                fontSize: FS(14),
                color: this.state.type_id === null ? APP_COLOR_BLUE_2 : '#fff',
              },
            ]}
          >
            PAY NOW
          </Text>
        </TouchableOpacity>
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
              Account in your wallet is not enough to pay. Please top up your account to continue using.
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
                onPress={() => {}}
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
                  Recharge{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapActionCreators = { buyTicket };

const mapStateToProps = state => ({ token: state.user.token, userData: state.user.userData });

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailEventPayComponent);
