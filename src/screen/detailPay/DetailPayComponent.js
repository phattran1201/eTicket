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

class DetailEventPayComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, loadDone: false, dialogVisible: false };
  }

  render() {
    const { item } = this.props.navigation.state.params;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          iconColor="#fff"
          bodyTitle="Ticket Detail"
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
                  lineHeight: 30
                }
              ]}
            >
              {item.title}
            </Text>
            <Text style={[style.text, { fontSize: FS(12), color: APP_COLOR_TEXT, marginTop: 10 }]}>
              By {item.contactPerson}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginTop: 25,
              marginBottom: 15
            }}
          >
            <FontAwesome
              name="calendar"
              style={{ marginTop: 5 }}
              size={14 * SCALE_RATIO_WIDTH_BASIS}
              color={APP_COLOR_TEXT_GRAY_2}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>{item.end_date}</Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>{item.type}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15
            }}
          >
            <FontAwesome
              name="calendar"
              style={{ marginTop: 5 }}
              size={14 * SCALE_RATIO_WIDTH_BASIS}
              color={APP_COLOR_TEXT_GRAY_2}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>{item.locationName}</Text>
              <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>{item.address}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 15
            }}
          >
            <FontAwesome
              name="calendar"
              style={{ marginTop: 5 }}
              size={14 * SCALE_RATIO_WIDTH_BASIS}
              color={APP_COLOR_TEXT_GRAY_2}
            />
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
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ dialogVisible: true })}
              style={{
                width: 100 * SCALE_RATIO_WIDTH_BASIS,
                marginLeft: 25,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: APP_COLOR,
                backgroundColor: APP_COLOR,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 4
              }}
            >
              <Text style={[style.text, { fontSize: FS(10), color: '#fff' }]}>Common Ticket</Text>
              <Text style={[style.text, { fontFamily: FONT.Bold, fontSize: FS(12), color: '#fff' }]}>$14</Text>
              <Text style={[style.text, { fontSize: FS(10), color: '#fff' }]}>QTY: 100</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ dialogVisible: true })}
              style={{
                width: 100 * SCALE_RATIO_WIDTH_BASIS,
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: APP_COLOR_BLUE_2,
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 4
              }}
            >
              <Text style={[style.text, { fontSize: FS(10), color: APP_COLOR_BLUE_2 }]}>VIP Ticket</Text>
              <Text style={[style.text, { fontFamily: FONT.Bold, fontSize: FS(12), color: APP_COLOR_BLUE_2 }]}>
                $20
              </Text>
              <Text style={[style.text, { fontSize: FS(10), color: APP_COLOR_BLUE_2 }]}>QTY: 200</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS
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
                borderRadius: 4
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
            backgroundColor: APP_COLOR,
            marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
            paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignItems: 'center'
          }}
          onPress={() => {
            this.props.navigation.navigate(ROUTE_KEY.DETAIL_PAY_SUCESS, {
              item
            });
          }}
        >
          <Text
            style={[
              style.textCaption,
              {
                fontFamily: FONT.Bold,
                fontSize: FS(14),
                color: '#fff'
              }
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
              backgroundColor: 'white'
            }}
          >
            <Text style={[style.textCaption, { fontSize: FS(24), textAlign: 'center' }]}>Opps! </Text>
            <Text
              style={[
                style.text,
                { fontSize: FS(12), textAlign: 'center', marginVertical: 15 * SCALE_RATIO_WIDTH_BASIS }
              ]}
            >
              Account in your wallet is not enough to pay. Please top up your account to continue using.
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 20 * SCALE_RATIO_WIDTH_BASIS,
                  marginRight: 10 * SCALE_RATIO_WIDTH_BASIS,

                  backgroundColor: '#fff',
                  borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS
                }}
                onPress={() => {
                  // console.log('poi this.props.listNewsArticles:', this.props.listNewsArticles);
                  // this.props.navigation.navigate(ROUTE_KEY.NEWS, {
                  //   title: articleTitle,
                  //   data: this.props.listNewsArticles
                  // });
                }}
              >
                <Text
                  onPress={() => {
                    this.setState({ dialogVisible: false });
                    // console.log('poi this.props.listNewsArticles:', this.props.listNewsArticles);
                    // this.props.navigation.navigate(ROUTE_KEY.NEWS, {
                    //   title: articleTitle,
                    //   data: this.props.listNewsArticles
                    // });
                  }}
                  style={[
                    style.text,
                    {
                      textAlign: 'center',
                      fontSize: FS(14),
                      color: APP_COLOR_TEXT
                    }
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
                  paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS
                }}
                onPress={() => {
                  // console.log('poi this.props.listNewsArticles:', this.props.listNewsArticles);
                  // this.props.navigation.navigate(ROUTE_KEY.NEWS, {
                  //   title: articleTitle,
                  //   data: this.props.listNewsArticles
                  // });
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      textAlign: 'center',
                      fontFamily: FONT.Bold,
                      fontSize: FS(14),
                      color: '#fff'
                    }
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

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailEventPayComponent);
