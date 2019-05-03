import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { DEVICE_WIDTH, FS, IS_IOS, ROUTE_KEY, SCALE_RATIO_WIDTH_BASIS, SLICE_NUM } from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, { APP_COLOR, APP_COLOR_2, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY, FONT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithAvatar from '../../view/HeaderWithAvatar';
import BaseHeader from '../../view/BaseHeader';
import { loadListPopularEvents, loadListInWeekEvents, loadListFreeEvents } from './HomeActions';
import MyImage from '../../view/MyImage';
import moment from 'moment';
import { logout } from '../login/LoginActions';
import ItemList from '../../view/ItemList';
import { QRCode } from 'react-native-custom-qr-codes';
import { followEvent, unfollowEvent, getListFollowEvent } from '../follow/FollowActions';
import { alert } from '../../utils/alert';
import strings from '../../constants/Strings';

class HomeComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }

  componentWillMount() {
    this.props.getListFollowEvent();
    this.props.loadListPopularEvents();
    this.props.loadListInWeekEvents();
    this.props.loadListFreeEvents();
  }
  shouldComponentUpdate(nextProps, nextSate) {
    if (this.props.listEventPopular !== nextProps.listEventPopular) {
      return true;
    }
    if (this.props.listEventInWeek !== nextProps.listEventInWeek) {
      return true;
    }
    if (this.props.listEventFree !== nextProps.listEventFree) {
      return true;
    }
    if (this.props.listFollow !== nextProps.listFollow) {
      return true;
    }
    return false;
  }

  onFollow(id) {
    followEvent(this.props.token, id)
      .then(res => {
        this.props.getListFollowEvent();
        this.forceUpdate();
        // alert(strings.alert, 'Follow success');
      })
      .catch(err => {
        alert(strings.alert, 'Follow false');
      });
  }
  unFollow(id) {
    unfollowEvent(this.props.token, id)
      .then(res => {
        this.props.getListFollowEvent();
        this.forceUpdate();
        // alert(strings.alert, 'Unfollow success');
      })
      .catch(err => {
        alert(strings.alert, 'Unfollow false');
      });
  }
  renderPopular = ({ item, index }) => {
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
    let isFollow = false;
    if (this.props.listFollow && this.props.listFollow !== null) {
      this.props.listFollow.forEach(e => {
        if (e.id === item.id) {
          isFollow = true;
        }
      });
    }

    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate(ROUTE_KEY.DETAIL_EVENT, { item })}>
        <TouchableOpacity
          onPress={() => (isFollow ? this.unFollow(item.id) : this.onFollow(item.id))}
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
            name={isFollow ? 'heart' : 'heart-outline'}
            size={25 * SCALE_RATIO_WIDTH_BASIS}
            color={APP_COLOR}
            style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
          />
        </TouchableOpacity>
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

  renderItem = ({ item, index }) => {
    return <ItemList item={item} navigation={this.props.navigation} />;
  };

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            style={{
              top: -(DEVICE_WIDTH * 1.25),
              left: -(DEVICE_WIDTH * 0.55),
              width: DEVICE_WIDTH * 2,
              height: DEVICE_WIDTH * 2,
              borderRadius: DEVICE_WIDTH,
              position: 'absolute',
            }}
            start={{ x: 0.1, y: 0.75 }}
            end={{ x: 0.75, y: 0.25 }}
            colors={[APP_COLOR, APP_COLOR_2]}
          />
          <BaseHeader
            noShadow
            translucent
            styleContent={{
              backgroundColor: 'transparent',
            }}
            rightIconStyle={{ color: 'white' }}
            rightIcon='bell'
            rightIconType='SimpleLineIcons'
            onRightPress={() => this.props.logout(() => this.props.navigation.replace(ROUTE_KEY.PRE_LOGIN))}
          />
          <View style={{ paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS }}>
            <Text style={[style.text, { fontSize: FS(17), color: '#fff' }]}>Near by</Text>
            <Text
              style={[
                style.textCaption,
                {
                  fontSize: FS(32),
                  color: '#fff',
                  textDecorationLine: 'underline',
                  letterSpacing: 3,
                  lineHeight: 50,
                },
              ]}
            >
              Hồ Chí Minh
            </Text>
          </View>
          {/* Cửa hàng gần bạn */}
          <View
            style={{
              marginTop: 15 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
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
                    color: 'white',
                    fontFamily: FONT.SemiBold,
                  },
                ]}
              >
                Popular events
              </Text>
              {/* <TouchableOpacity
                style={{ flexDirection: 'row' }}
                // onPress={() => alert(strings.alert, strings.this_feature_is_in_development)}
                onPress={() => {
                  this.props.navigation.navigate(ROUTE_KEY.PROMOTION_COMPONENT, {
                    title: articlePromotionTitle,
                    data: this.props.listPromotionArticles
                  });
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      color: '#9c9faa'
                    }
                  ]}
                >
                  Xem tất cả
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16 * SCALE_RATIO_WIDTH_BASIS}
                  style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
                  color="#9c9faa"
                />
              </TouchableOpacity> */}
            </View>

            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              hasParallaxImages
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              data={this.props.listEventPopular}
              renderItem={this.renderPopular}
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
          <View
            style={{
              marginTop: 30 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
            <View
              style={{
                paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
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
                    fontFamily: FONT.SemiBold,
                  },
                ]}
              >
                Upcoming in week
              </Text>
            </View>
            {this.props.listEventInWeek.length === 0 ? (
              <View
                style={{
                  // marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  // height: 86 * SCALE_RATIO_WIDTH_BASIS,
                  marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
                  marginBottom: 30 * SCALE_RATIO_WIDTH_BASIS,
                }}
                onPress={() => {}}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(14),
                      color: '#00000050',
                    },
                  ]}
                >
                  No events in the next week
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  style={{ flex: 1 }}
                  data={this.props.listEventInWeek}
                  renderItem={this.renderItem}
                  // onRefresh={this.onRefresh}
                  // refreshing={this.state.refreshing}
                  // onEndReached={this.handleLoadMore}
                  // onEndReachedThreshold={0.01}
                  // ListFooterComponent={this.renderFooter}
                />
                <TouchableOpacity
                  style={{
                    marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
                    marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                    borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                    borderWidth: 1,
                    borderColor: APP_COLOR_TEXT_GRAY,
                    padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                    alignItems: 'center',
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(14),
                        color: '#000',
                      },
                    ]}
                  >
                    See more event (2000+)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={{
              marginBottom: 30 * SCALE_RATIO_WIDTH_BASIS,
            }}
          >
            <View
              style={{
                paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
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
                    fontFamily: FONT.SemiBold,
                  },
                ]}
              >
                Event Free
              </Text>
            </View>
            {this.props.listEventFree.length === 0 ? (
              <View
                style={{
                  // marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  // height: 86 * SCALE_RATIO_WIDTH_BASIS,
                  marginTop: 10 * SCALE_RATIO_WIDTH_BASIS,
                  marginBottom: 30 * SCALE_RATIO_WIDTH_BASIS,
                }}
                onPress={() => {}}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(14),
                      color: '#00000050',
                    },
                  ]}
                >
                  No events in the next week
                </Text>
              </View>
            ) : (
              <View>
                <FlatList
                  style={{ flex: 1 }}
                  data={this.props.listEventFree}
                  renderItem={this.renderItem}
                  // onRefresh={this.onRefresh}
                  // refreshing={this.state.refreshing}
                  // onEndReached={this.handleLoadMore}
                  // onEndReachedThreshold={0.01}
                  // ListFooterComponent={this.renderFooter}
                />
                <TouchableOpacity
                  style={{
                    marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
                    marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                    borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                    borderWidth: 1,
                    borderColor: APP_COLOR_TEXT_GRAY,
                    padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                    alignItems: 'center',
                  }}
                  onPress={() => {}}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(14),
                        color: '#000',
                      },
                    ]}
                  >
                    See more event (2000+)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  markerImageStyle: {
    width: 40 * SCALE_RATIO_WIDTH_BASIS,
    height: 40 * SCALE_RATIO_WIDTH_BASIS,
  },
  searchInputContainer: {
    paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
    position: 'absolute',
    top: 20 * SCALE_RATIO_WIDTH_BASIS,
    width: DEVICE_WIDTH,
    height: 50 * SCALE_RATIO_WIDTH_BASIS,
  },
  searchInput: {
    borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
    flex: 1,
    height: 50 * SCALE_RATIO_WIDTH_BASIS,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  searchNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchNameTextStyle: {
    fontSize: 14 * SCALE_RATIO_WIDTH_BASIS,
    color: '#767676',
    fontWeight: '500',
  },
  searchIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40 * SCALE_RATIO_WIDTH_BASIS,
    height: '100%',
  },
  carouselItemMoreInfo: {
    textAlign: 'center',
    fontSize: 10 * SCALE_RATIO_WIDTH_BASIS,
  },
});
const mapActionCreators = {
  loadListPopularEvents,
  logout,
  loadListInWeekEvents,
  loadListFreeEvents,
  getListFollowEvent,
};

const mapStateToProps = state => ({
  token: state.user.token,
  userData: state.user.userData,
  listEventPopular: state.event.listEventPopular,
  listEventInWeek: state.event.listEventInWeek,
  listEventFree: state.event.listEventFree,
  listFollow: state.user.listFollow,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(HomeComponent);
