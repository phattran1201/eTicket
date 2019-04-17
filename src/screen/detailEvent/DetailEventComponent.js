import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
  DEVICE_WIDTH,
  FS,
  IS_ANDROID,
  SCALE_RATIO_WIDTH_BASIS,
  SLICE_NUM,
  ROUTE_KEY,
  SCALE_RATIO_HEIGHT_BASIS,
  IS_IOS,
} from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, {
  APP_COLOR,
  APP_COLOR_TEXT,
  APP_COLOR_TEXT_GRAY,
  APP_COLOR_TEXT_GRAY_2,
  FONT,
} from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import MyImage from '../../view/MyImage';
import moment from 'moment';

class DetailEventComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, loadDone: false };
    this.store = DATA_TEST;
    this.data = DATA_TEST;
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }

  renderSuggested = ({ item, index }) => {
    let minPrice = item.tickettype.data[0].price;
    let maxPrice = item.tickettype.data[0].price;
    for (let i = 1; i < item.tickettype.data.length; i++) {
      if (minPrice > item.tickettype.data[i].price) {
        minPrice = item.tickettype.data[i].price;
      }
    }
    for (let i = 1; i < item.tickettype.data.length; i++) {
      if (maxPrice < item.tickettype.data[i].price) {
        maxPrice = item.tickettype.data[i].price;
      }
    }

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(ROUTE_KEY.DETAIL_EVENT, { item })}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40 * SCALE_RATIO_WIDTH_BASIS,
            height: 40 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: (40 * SCALE_RATIO_WIDTH_BASIS) / 2,
            position: 'absolute',
            top: 5,
            right: 10,
            backgroundColor: 'white',
            zIndex: 999,
          }}
        >
          <MaterialCommunityIcons
            name='heart-outline'
            size={25 * SCALE_RATIO_WIDTH_BASIS}
            color={APP_COLOR}
            style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
          />
        </View>
        <View
          style={[
            {
              overflow: 'visible',
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: IS_IOS ? 5 : 6,
              flex: 1,
              backgroundColor: 'white',
              marginLeft: 15,
            },
          ]}
        >
          <View>
            <MyImage
              style={{
                width: '100%',
                height: 150 * SCALE_RATIO_WIDTH_BASIS,
              }}
              source={{
                uri: item.image,
              }}
            />
          </View>

          <Text
            style={[
              style.textCaption,
              {
                color: APP_COLOR_TEXT,
                fontSize: FS(14),
                padding: 5 * SCALE_RATIO_WIDTH_BASIS,
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            style={[
              style.textCaption,
              {
                color: APP_COLOR_TEXT_GRAY,
                fontSize: FS(10),
                padding: 5 * SCALE_RATIO_WIDTH_BASIS,
              },
            ]}
            numberOfLines={2}
          >
            {moment(item.end_date).format('ddd,MMMM')}
            {'  '}
            {item.start_time} - {item.end_time}:00
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ borderWidth: 0.5, borderColor: '#70707050', padding: 1, borderRadius: 3 }}>
              <Text
                style={[
                  style.textCaption,
                  {
                    alignSelf: 'flex-start',
                    color: APP_COLOR_TEXT,
                    fontSize: FS(10),
                    padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                  },
                ]}
                numberOfLines={2}
              >
                {item.category}
              </Text>
            </View>
            {/* {item.tickettype.data.map(e => ( */}
            {item.tickettype.data.length === 1 ? (
              <View
                style={{
                  marginLeft: 5,
                  borderWidth: 0.5,
                  borderColor: APP_COLOR,
                  backgroundColor: item.tickettype.data[0].price < 1 ? APP_COLOR : 'white',
                  padding: 1,
                  borderRadius: 3,
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      alignSelf: 'flex-start',
                      color: item.tickettype.data[0].price < 1 ? 'white' : APP_COLOR,
                      fontSize: FS(10),
                      padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.tickettype.data[0].price < 1 ? 'Free' : `From ${item.tickettype.data[0].price}`}
                </Text>
              </View>
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    marginLeft: 5,
                    borderWidth: 0.5,
                    borderColor: APP_COLOR,
                    backgroundColor: minPrice < 1 ? APP_COLOR : 'white',
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        alignSelf: 'flex-start',
                        color: minPrice < 1 ? 'white' : APP_COLOR,
                        fontSize: FS(10),
                        padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {minPrice < 1 ? 'Free' : `From ${minPrice}`}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 5,
                    borderWidth: 0.5,
                    borderColor: APP_COLOR,
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        alignSelf: 'flex-start',
                        color: APP_COLOR,
                        fontSize: FS(10),
                        padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    To ${maxPrice}
                  </Text>
                </View>
              </View>
            )}

            {/* ))} */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const jsCode = `
            document.querySelector('#content').style.background = '#fff';
        document.querySelector('section.banner').style.display='none';
        document.querySelector('div.btn-contact-organizer').style.display='none';
        document.querySelector('section.ticket').style.display='none';
        document.querySelector('#navbarheader').style.display='none';
        document.querySelector('footer.footer').style.display='none';
        document.querySelector('div.app-ads').style.display='none';
        document.querySelector('div.app-ads').style.position='unset';
    `;
    const url =
      'https://ticketbox.vn/event/sunspiration-city-festival-74929?utm_medium=TKB&utm_source=TKBHomePage&utm_campaign=homepage_hot_2';

    const { item } = this.props.navigation.state.params;
    return (
      <View style={{ backgroundColor: 'white', flex: 1, paddingBottom: 20 * SCALE_RATIO_HEIGHT_BASIS }}>
        {/* <LinearGradient
          style={{
            top: -(DEVICE_WIDTH * 1.25),
            left: -(DEVICE_WIDTH * 0.55),
            width: DEVICE_WIDTH * 2,
            height: DEVICE_WIDTH * 2,
            borderRadius: DEVICE_WIDTH,
            position: 'absolute'
          }}
          start={{ x: 0.1, y: 0.75 }}
          end={{ x: 0.75, y: 0.25 }}
          colors={[APP_COLOR, APP_COLOR_2]}
        /> */}
        <HeaderWithBackButtonComponent
          noShadow
          styleContent={{ position: 'absolute', zIndex: 999 }}
          onPress={() => this.props.navigation.goBack()}
          styleIcon={{}}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={{
              width: '100%',
              height: 150 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 20,
            }}
            source={{
              uri: 'https://tkbvn-tokyo.s3.amazonaws.com/Upload/eventcover/2019/02/26/DFB19E.jpg',
            }}
          />
          <View style={{ paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS }}>
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
            <Text style={[style.text, { fontSize: FS(12), color: APP_COLOR_TEXT, marginTop: 10 }]}>
              by {item.contactPerson}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
              paddingVertical: 15,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: APP_COLOR_TEXT_GRAY_2,
            }}
          >
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='heart-o' size={23 * SCALE_RATIO_WIDTH_BASIS} color={APP_COLOR_TEXT_GRAY_2} />
              <Text style={[style.textCaption, { color: APP_COLOR_TEXT_GRAY }]}>Like Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='map-o' size={23 * SCALE_RATIO_WIDTH_BASIS} color={APP_COLOR_TEXT_GRAY_2} />
              <Text style={[style.textCaption, { color: APP_COLOR_TEXT_GRAY }]}>Share Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='share-square-o' size={23 * SCALE_RATIO_WIDTH_BASIS} color={APP_COLOR_TEXT_GRAY_2} />
              <Text style={[style.textCaption, { color: APP_COLOR_TEXT_GRAY }]}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name='ellipsis-h' size={23 * SCALE_RATIO_WIDTH_BASIS} color={APP_COLOR_TEXT_GRAY_2} />
              <Text style={[style.textCaption, { color: APP_COLOR_TEXT_GRAY }]}>More</Text>
            </TouchableOpacity>
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
          <TouchableOpacity
            style={{
              backgroundColor: APP_COLOR,
              marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
              marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate(ROUTE_KEY.DETAIL_PAY, { item });
            }}
          >
            <Text
              style={[
                style.textCaption,
                {
                  fontFamily: FONT.Bold,
                  fontSize: FS(14),
                  color: '#fff',
                },
              ]}
            >
              Get Ticket Now
            </Text>
          </TouchableOpacity>
          <Text style={[style.text, { fontSize: FS(12), fontcolor: APP_COLOR_TEXT_GRAY, textAlign: 'center' }]}>
            Pay free tickets within 3 days before the event
          </Text>
          <View
            style={{ flex: 1, marginTop: 20 * SCALE_RATIO_WIDTH_BASIS, marginBottom: this.state.loadDone ? -30 : 0 }}
          >
            <AutoHeightWebView
              customStyle={`
      * {
        box-shadow: none !important;
       font-family: 'Barlow', sans-serif;
      }
      h3 {
        font-size: 1em !important;
      }
      body,a, button, h1, h2, h3, h4, h5, h6, li, option, p, span, td, th {
        font-size: 0.9em !important;
         box-shadow: none !important;
      }
 .section {
  box-shadow: none !important;
}
.relative {
  margin-top: 0px !important;
}
 .organizer,organizer {
         -webkit-box-shadow: none !important;
         -moz-box-shadow: none !important;
         box-shadow: none !important;
    }
.mainContainer .title {
    padding-bottom: 5px !important;
    border-bottom:  none !important;
}
`}
              thirdPartyCookiesEnabled
              domStorageEnabled
              mixedContentMode='compatibility'
              onLoadEnd={() => this.setState({ loadDone: true })}
              style={{ width: DEVICE_WIDTH }}
              javaScriptEnabled
              customScript={jsCode}
              scalesPageToFit={!!IS_ANDROID}
              source={{ uri: url }}
            />
          </View>
          <View style={{}}>
            <View
              style={{
                paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
              }}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(16),
                    color: APP_COLOR_TEXT,
                    fontFamily: FONT.Medium,
                  },
                ]}
              >
                Suggested Events
              </Text>
            </View>

            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              hasParallaxImages
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              data={this.props.listEventPopular.filter(e => e.category === item.category)}
              renderItem={this.renderSuggested}
              sliderWidth={DEVICE_WIDTH}
              itemWidth={(DEVICE_WIDTH * 70) / 100}
              enableMomentum
              activeSlideAlignment={'start'}
              activeAnimationType={'spring'}
              activeAnimationOptions={{
                friction: 4,
                tension: 40,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({ listEventPopular: state.event.listEventPopular });

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailEventComponent);
