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
import { loadListPopularEvents } from './HomeActions';
import MyImage from '../../view/MyImage';
import moment from 'moment';

class HomeComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0 };
    this.store = DATA_TEST;
    this.data = DATA_TEST;
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }
  componentDidMount() {
    console.log('dauphaiphat:shouldComponentUpdate -> this.props.listEventPopular', this.props.listEventPopular);
    this.props.loadListPopularEvents();
  }

  // shouldComponentUpdate(nextProps, nexState) {
  //   console.log('dauphaiphat:shouldComponentUpdate -> nextProps.listEventPopular', nextProps.listEventPopular);
  //   console.log('dauphaiphat:shouldComponentUpdate -> this.props.listEventPopular', this.props.listEventPopular);
  //   if (this.props.listEventPopular == nextProps.listEventPopular) {
  //     console.log('dauphaiphat:shouldComponentUpdate -> nextProps.listEventPopular', nextProps.listEventPopular);
  //     console.log('dauphaiphat:shouldComponentUpdate -> this.props.listEventPopular', this.props.listEventPopular);
  //     return false;
  //   }
  //   return true;
  // }

  // componentDidUpdate(nextProps, nexState) {
  //   if (this.props.listEventPopular.length != nextProps.listEventPopular.length) {
  //     console.log(
  //       'dauphaiphat: HomeComponent -> componentDidUpdate -> this.props.listEventPopular != nextProps.listEventPopular',
  //       this.props.listEventPopular != nextProps.listEventPopular
  //     );
  //     console.log('dauphaiphat:componentWillUpdate -> nextProps.listEventPopular', nextProps.listEventPopular);
  //     console.log('dauphaiphat:componentWillUpdate -> this.props.listEventPopular', this.props.listEventPopular);
  //   } else {
  //     this.props.loadListPopularEvents();
  //   }
  // }
  // // renderBannerItem = ({ item, index }) => (
  // //   <TouchableOpacity onPress={() => {}}>
  // //     <Image
  // //       style={{
  // //         width: '100%',
  // //         height: 158 * SCALE_RATIO_WIDTH_BASIS,
  // //         borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS
  // //       }}
  // //       source={{
  // //         uri: item.slide_img ? item.slide_img : 'https://www.fancyhands.com/images/default-avatar-250x250.png'
  // //       }}
  // //     />
  // //   </TouchableOpacity>
  // // );

  renderPopular = ({ item, index }) => (
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
          zIndex: 999
        }}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={25 * SCALE_RATIO_WIDTH_BASIS}
          color={APP_COLOR}
          style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
        />
      </View>
      <View style={[styles.carouselItemContainer, { marginLeft: 15, overflow: 'hidden' }]}>
        <View>
          <MyImage
            style={{
              width: '100%',
              height: 150 * SCALE_RATIO_WIDTH_BASIS
            }}
            source={{
              uri: item.image
            }}
          />
        </View>

        <Text
          style={[
            style.textCaption,
            {
              color: APP_COLOR_TEXT,
              fontSize: FS(14),
              padding: 5 * SCALE_RATIO_WIDTH_BASIS
            }
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
              padding: 5 * SCALE_RATIO_WIDTH_BASIS
            }
          ]}
          numberOfLines={2}
        >
          {item.start_date} - {item.end_date}
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
                  padding: 5 * SCALE_RATIO_WIDTH_BASIS
                }
              ]}
              numberOfLines={2}
            >
              {item.category}
            </Text>
          </View>
          <View style={{ marginLeft: 5, borderWidth: 0.5, borderColor: APP_COLOR, padding: 1, borderRadius: 3 }}>
            <Text
              style={[
                style.textCaption,
                {
                  alignSelf: 'flex-start',
                  color: APP_COLOR,
                  fontSize: FS(10),
                  padding: 5 * SCALE_RATIO_WIDTH_BASIS
                }
              ]}
              numberOfLines={2}
            >
              From ${item.id}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderNewsItem = ({ item, index }) => (
    <TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
          right: 20,
          zIndex: 999
        }}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={20 * SCALE_RATIO_WIDTH_BASIS}
          color={APP_COLOR}
          style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
        />
      </View>
      <View
        style={[
          {
            paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            marginBottom: 10 * SCALE_RATIO_WIDTH_BASIS,
            flex: 1,
            backgroundColor: 'white',
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center'
          }
        ]}
      >
        <View style={{ flex: 3 }}>
          <MyImage
            style={{
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              width: '100%',
              height: 86 * SCALE_RATIO_WIDTH_BASIS
            }}
            source={{
              uri: item.image
            }}
          />
        </View>
        <View style={{ flex: 6, paddingLeft: 5 * SCALE_RATIO_WIDTH_BASIS }}>
          <Text
            style={[
              style.textCaption,
              {
                color: APP_COLOR_TEXT,
                fontSize: FS(14),
                padding: 5 * SCALE_RATIO_WIDTH_BASIS
              }
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
                padding: 5 * SCALE_RATIO_WIDTH_BASIS
              }
            ]}
            numberOfLines={2}
          >
            {item.start_date} - {item.end_date}
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
                    padding: 5 * SCALE_RATIO_WIDTH_BASIS
                  }
                ]}
                numberOfLines={2}
              >
                {item.category}
              </Text>
            </View>
            <View style={{ marginLeft: 5, borderWidth: 0.5, borderColor: APP_COLOR, padding: 1, borderRadius: 3 }}>
              <Text
                style={[
                  style.textCaption,
                  {
                    alignSelf: 'flex-start',
                    color: APP_COLOR,
                    fontSize: FS(10),
                    padding: 5 * SCALE_RATIO_WIDTH_BASIS
                  }
                ]}
                numberOfLines={2}
              >
                From ${item.id}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    const nickname = 'Đăng Nhập';
    const point = 0;
    const avatar = null;

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {/* <BaseHeader noShadow /> */}

        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
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
          />
          <HeaderWithAvatar
            styleContent={{ backgroundColor: 'transparent' }}
            noShadow
            name={nickname}
            styleName={{ color: '#fff' }}
            rightIconStyle={{ color: '#fff' }}
            point={point}
            avatar={avatar}
            onAvatarPress={() => this.props.navigation.navigate(ROUTE_KEY.PERSONALINFO)}
            onPointPress={() => this.props.navigation.navigate(ROUTE_KEY.REWARDS)}
            rightIcon="bell"
            rightIconType="SimpleLineIcons"
            onRightPress={() => {}}
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
                  lineHeight: 50
                }
              ]}
            >
              Hồ Chí Minh
            </Text>
          </View>
          {/* Cửa hàng gần bạn */}
          <View
            style={{
              marginTop: 15 * SCALE_RATIO_WIDTH_BASIS
            }}
          >
            <View
              style={{
                paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
              }}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(16),
                    color: 'white',
                    fontFamily: FONT.SemiBold
                  }
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
                tension: 40
              }}
            />
          </View>
          <View
            style={{
              marginTop: 30 * SCALE_RATIO_WIDTH_BASIS
            }}
          >
            <View
              style={{
                paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
              }}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(16),
                    color: APP_COLOR_TEXT,
                    fontFamily: FONT.SemiBold
                  }
                ]}
              >
                Upcoming in week
              </Text>
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={this.props.listEventPopular.filter(e => e.end_date === moment().format('YYYY-MM-DD'))}
              renderItem={this.renderNewsItem}
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
                alignItems: 'center'
              }}
              onPress={() => {}}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(14),
                    color: '#000'
                  }
                ]}
              >
                See more event (2000+)
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 30 * SCALE_RATIO_WIDTH_BASIS
            }}
          >
            <View
              style={{
                paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
              }}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(16),
                    color: APP_COLOR_TEXT,
                    fontFamily: FONT.SemiBold
                  }
                ]}
              >
                Free entry ticket
              </Text>
            </View>
            <FlatList
              style={{ flex: 1 }}
              data={this.props.listEventPopular}
              renderItem={this.renderNewsItem}
              onRefresh={this.onRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.01}
              ListFooterComponent={this.renderFooter}
            />
            <TouchableOpacity
              style={{
                marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
                marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                borderWidth: 1,
                borderColor: APP_COLOR_TEXT_GRAY,
                padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                alignItems: 'center'
              }}
              onPress={() => {}}
            >
              <Text
                style={[
                  style.textCaption,
                  {
                    fontSize: FS(14),
                    color: '#000'
                  }
                ]}
              >
                See more event (2000+)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  markerImageStyle: {
    width: 40 * SCALE_RATIO_WIDTH_BASIS,
    height: 40 * SCALE_RATIO_WIDTH_BASIS
  },
  searchInputContainer: {
    paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
    position: 'absolute',
    top: 20 * SCALE_RATIO_WIDTH_BASIS,
    width: DEVICE_WIDTH,
    height: 50 * SCALE_RATIO_WIDTH_BASIS
  },
  searchInput: {
    borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
    flex: 1,
    height: 50 * SCALE_RATIO_WIDTH_BASIS,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  searchNameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchNameTextStyle: {
    fontSize: 14 * SCALE_RATIO_WIDTH_BASIS,
    color: '#767676',
    fontWeight: '500'
  },
  searchIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40 * SCALE_RATIO_WIDTH_BASIS,
    height: '100%'
  },
  carouselItemContainer: {
    overflow: 'visible',
    borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
    marginBottom: IS_IOS ? 5 : 6,
    flex: 1,
    backgroundColor: 'white'
  },
  carouselItemMoreInfo: {
    textAlign: 'center',
    fontSize: 10 * SCALE_RATIO_WIDTH_BASIS
  }
});
const mapActionCreators = { loadListPopularEvents };

const mapStateToProps = state => ({
  listEventPopular: state.eventPopular.listEventPopular
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(HomeComponent);
