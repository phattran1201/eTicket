import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
  DEVICE_WIDTH,
  FS,
  IS_IOS,
  ROUTE_KEY,
  SCALE_RATIO_WIDTH_BASIS,
  SLICE_NUM,
  SCALE_RATIO_HEIGHT_BASIS,
  DEVICE_HEIGHT
} from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, {
  APP_COLOR,
  APP_COLOR_2,
  APP_COLOR_TEXT,
  APP_COLOR_TEXT_GRAY,
  FONT,
  APP_COLOR_BLUE_2
} from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithAvatar from '../../view/HeaderWithAvatar';
import BaseHeader from '../../view/BaseHeader';
import MyImage from '../../view/MyImage';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Feather from 'react-native-vector-icons/dist/Feather';
import MySpinner from '../../view/MySpinner';
import global from '../../utils/globalUtils';
import Modal from 'react-native-modal';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import { CheckBox } from 'react-native-elements';

class SearchComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false,
      activeSlide: 0,
      keySearch: '',
      isLoading: false,
      filterSearch: false,
      filter: '',
      filterUpComming: 'All',
      filterEventCategory: 'All',
      filterPrice: 'All'
    };
  }
  // componentDidMount() {
  //   console.log('dauphaiphat:shouldComponentUpdate -> this.props.listEventPopular', this.props.listEventPopular);
  //   this.props.loadListPopularEvents();
  // }

  searchFilterFunction = () => {
    this.setState({ isLoading: true });
    MySpinner.show();
    // findAlbumOfKeySearch(this.state.keySearch)
    //   .then(dataSearch => {
    //     this.setState({ isLoading: false, dataSearch });
    //     this.forceUpdate();
    //     MySpinner.hide();
    //   })
    //   .catch(err => {});
  };
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {this.state.onFocus && (
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
                position: 'absolute'
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
                position: 'absolute'
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[`${APP_COLOR}90`, `${APP_COLOR_2}60`]}
            />
          </Animated.View>
        )}
        {!this.state.onFocus && (
          <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, position: 'absolute' }}>
            <LinearGradient
              style={{
                top: -(DEVICE_WIDTH * 1),
                left: -(DEVICE_WIDTH * 0.4),
                width: DEVICE_WIDTH * 1.5,
                height: DEVICE_WIDTH * 1.5,
                borderRadius: DEVICE_WIDTH,
                position: 'absolute'
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[APP_COLOR, APP_COLOR_2]}
            />
            <LinearGradient
              style={{
                opacity: 30,
                top: DEVICE_WIDTH / 1.5,
                right: -(DEVICE_WIDTH * 0.1),
                width: DEVICE_WIDTH * 0.3,
                height: DEVICE_WIDTH * 0.3,
                borderRadius: DEVICE_WIDTH,
                position: 'absolute'
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[`${APP_COLOR}60`, `${APP_COLOR_2}60`]}
            />
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            this.state.onFocus
              ? this.props.navigation.navigate(ROUTE_KEY.SEARCH_SUCCESS, { keySearch: this.state.keySearch })
              : this.props.navigation.navigate(ROUTE_KEY.SEARCH_SUCCESS, {
                  filterUpComming: this.state.filterUpComming,
                  filterEventCategory: this.state.filterEventCategory,
                  filterPrice: this.state.filterPrice
                });
          }}
          style={{
            zIndex: 99999,
            position: 'absolute',
            right: 20 * SCALE_RATIO_WIDTH_BASIS,
            bottom: 20 * SCALE_RATIO_WIDTH_BASIS,
            width: 40 * SCALE_RATIO_WIDTH_BASIS,
            height: 40 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 40 * SCALE_RATIO_WIDTH_BASIS,
            backgroundColor: !this.state.onFocus ? APP_COLOR : 'white',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Feather name="arrow-right" size={FS(32)} color={!this.state.onFocus ? 'white' : APP_COLOR} style={{}} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.onFocus && (
            <TouchableOpacity
              onPress={() => this.setState({ onFocus: false, keySearch: '' })}
              style={{
                position: 'absolute',
                left: 10 * SCALE_RATIO_WIDTH_BASIS,
                top: 25 * SCALE_RATIO_WIDTH_BASIS,
                width: 40 * SCALE_RATIO_WIDTH_BASIS,
                height: 40 * SCALE_RATIO_WIDTH_BASIS,
                // borderRadius: 40 * SCALE_RATIO_WIDTH_BASIS,
                // backgroundColor: !this.state.onFocus ? APP_COLOR : 'white',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Feather name="arrow-left" size={FS(30)} color={'white'} style={{}} />
            </TouchableOpacity>
          )}

          <View
            style={{
              paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: this.state.onFocus ? 150 * SCALE_RATIO_WIDTH_BASIS : 60 * SCALE_RATIO_HEIGHT_BASIS
            }}
          >
            <Feather name="search" size={FS(32)} color="white" style={{ marginRight: 10 * SCALE_RATIO_WIDTH_BASIS }} />
            <TextInput
              value={this.state.keySearch ? this.state.keySearch : ''}
              onSubmitEditing={() => this.searchFilterFunction()}
              onChangeText={text =>
                this.setState({
                  keySearch: text
                })
              }
              onFocus={() => this.setState({ onFocus: true })}
              clearButtonMode="always"
              placeholder="Search..."
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              style={[
                style.textCaption,
                {
                  borderBottomWidth: this.state.onFocus ? 1 : 0,
                  borderColor: 'white',
                  flex: 1,
                  fontSize: FS(32),
                  color: 'white',
                  textDecorationLine: 'underline',
                  letterSpacing: 3,
                  lineHeight: 50
                }
              ]}
            />
          </View>
          {!this.state.onFocus ? (
            <View
              style={{
                marginTop: DEVICE_WIDTH * 1.5 - DEVICE_WIDTH - 80 * SCALE_RATIO_HEIGHT_BASIS,
                paddingHorizontal: 40 * SCALE_RATIO_WIDTH_BASIS
              }}
            >
              <View
                style={{
                  marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(16),
                      color: APP_COLOR_BLUE_2,
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  Upcomming
                </Text>
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterUpComming' })}
                  style={[
                    style.text,
                    {
                      fontSize: FS(24),
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  {this.state.filterUpComming}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(16),
                      color: APP_COLOR_BLUE_2,
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  Near by
                </Text>
                <Text
                  // onPress={() => this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILTER, { filter: 'filterUpComming' })}
                  style={[
                    style.text,
                    {
                      fontSize: FS(24),
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  Hồ Chí Minh
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(16),
                      color: APP_COLOR_BLUE_2,
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  Event category
                </Text>
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterEventCategory' })}
                  style={[
                    style.text,
                    {
                      fontSize: FS(24),
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  {this.state.filterEventCategory}
                </Text>
              </View>
              <View
                style={{
                  marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS
                }}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      fontSize: FS(16),
                      color: APP_COLOR_BLUE_2,
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  Price
                </Text>
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterPrice' })}
                  style={[
                    style.text,
                    {
                      fontSize: FS(24),
                      fontFamily: FONT.SemiBold
                    }
                  ]}
                >
                  {this.state.filterPrice}
                </Text>
              </View>
            </View>
          ) : (
            <View />
          )}
        </ScrollView>
        <Modal
          onBackdropPress={() => this.setState({ filterSearch: false })}
          onSwipe={() => this.setState({ filterSearch: false })}
          swipeDirection={'down'}
          swipeThreshold={20}
          visible={this.state.filterSearch}
        >
          <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <LinearGradient
              style={{
                top: DEVICE_WIDTH / 4,
                right: -(DEVICE_WIDTH * 0.1),
                width: DEVICE_WIDTH * 0.3,
                height: DEVICE_WIDTH * 0.3,
                borderRadius: DEVICE_WIDTH,
                position: 'absolute'
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[`${APP_COLOR}90`, `${APP_COLOR_2}90`]}
            />
            <LinearGradient
              style={{
                top: DEVICE_WIDTH,
                left: -(DEVICE_WIDTH * 0.12),
                width: DEVICE_WIDTH * 0.3,
                height: DEVICE_WIDTH * 0.3,
                borderRadius: DEVICE_WIDTH,
                position: 'absolute'
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[`${APP_COLOR}90`, `${APP_COLOR_2}60`]}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <HeaderWithBackButtonComponent
                noShadow
                iconColor={APP_COLOR_TEXT}
                onPress={() => this.setState({ filterSearch: false })}
              />
              {this.state.filter === 'filterUpComming' && (
                <View
                  style={{
                    marginTop: 60 * SCALE_RATIO_WIDTH_BASIS,
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold
                      }
                    ]}
                  >
                    Upcomming
                  </Text>
                  <View style={{ marginTop: 40 * SCALE_RATIO_WIDTH_BASIS }}>
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === 'All' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="All"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterUpComming === 'All'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterUpComming: 'All' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === 'Today' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="Today"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterUpComming === 'Today'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterUpComming: 'Today' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === 'Tomorrow' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="Tomorrow"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterUpComming === 'Tomorrow'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterUpComming: 'Tomorrow' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === 'This weekend' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="This weekend"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterUpComming === 'This weekend'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterUpComming: 'This weekend' });
                      }}
                    />
                  </View>
                </View>
              )}
              {this.state.filter === 'filterEventCategory' && (
                <View
                  style={{
                    marginTop: 60 * SCALE_RATIO_WIDTH_BASIS,
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold
                      }
                    ]}
                  >
                    Event category
                  </Text>
                  <View style={{ marginTop: 40 * SCALE_RATIO_WIDTH_BASIS }}>
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterEventCategory === 'All' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="All"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterEventCategory === 'All'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterEventCategory: 'All' });
                      }}
                    />
                    {this.props.listCategory.map(e => (
                      <CheckBox
                        textStyle={[
                          style.text,
                          {
                            color: this.state.filterEventCategory === e.name ? APP_COLOR : APP_COLOR_TEXT,
                            fontSize: FS(22)
                          }
                        ]}
                        containerStyle={{
                          justifyContent: 'space-between',
                          borderWidth: 0,
                          backgroundColor: 'transparent',
                          paddingLeft: 0,
                          marginLeft: 0
                        }}
                        title={e.name}
                        iconRight
                        iconType="material"
                        checkedIcon="check"
                        uncheckedIcon=""
                        checked={this.state.filterEventCategory === e.name}
                        checkedColor={APP_COLOR}
                        uncheckedColor="tranparent"
                        size={18}
                        onPress={() => {
                          this.setState({ filterEventCategory: e.name });
                        }}
                      />
                    ))}
                  </View>
                </View>
              )}
              {this.state.filter === 'filterPrice' && (
                <View
                  style={{
                    marginTop: 60 * SCALE_RATIO_WIDTH_BASIS,
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold
                      }
                    ]}
                  >
                    Price
                  </Text>
                  <View style={{ marginTop: 40 * SCALE_RATIO_WIDTH_BASIS }}>
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterPrice === 'All' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="All"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterPrice === 'All'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterPrice: 'All' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterPrice === 'Free ticket' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="Free ticket"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterPrice === 'Free ticket'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterPrice: 'Free ticket' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterPrice === 'Paid ticket' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22)
                        }
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0
                      }}
                      title="Paid ticket"
                      iconRight
                      iconType="material"
                      checkedIcon="check"
                      uncheckedIcon=""
                      checked={this.state.filterPrice === 'Paid ticket'}
                      checkedColor={APP_COLOR}
                      uncheckedColor="tranparent"
                      size={18}
                      onPress={() => {
                        this.setState({ filterPrice: 'Paid ticket' });
                      }}
                    />
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapActionCreators = {};

const mapStateToProps = state => ({
  listCategory: state.categoryReducer.listCategory
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(SearchComponent);
