import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Feather from 'react-native-vector-icons/dist/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { connect } from 'react-redux';
import { FS, SCALE_RATIO_HEIGHT_BASIS, SCALE_RATIO_WIDTH_BASIS } from '../../constants/Constants';
import style, { APP_COLOR_BORDER, APP_COLOR_TEXT, FONT } from '../../constants/style';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import ItemList from '../../view/ItemList';
import MyComponent from '../../view/MyComponent';
import MySpinner from '../../view/MySpinner';
import { loadSearchByKeyword, loadSearchByOption } from './SearchActions';

class SuccessSearchComponent extends MyComponent {
  constructor(props) {
    super(props);
    const {
      keySearch,
      filterUpComming,
      filterEventCategory,
      filterPrice,
      searchOpiton,
    } = this.props.navigation.state.params;

    this.state = {
      searchOpiton,
      dataSearch: '',
      filterSearch: false,
      filter: '',
      page: 1,
      refreshing: false,
      loading: false,
      outOfData: false,
      keySearch,
      filterUpComming,
      filterEventCategory,
      filterPrice,
      listFilterUpComming: [
        { id: 'today', name: 'To Day' },
        { id: 'tomorrow', name: 'Tomorrow' },
        { id: 'thisWeek', name: 'This Week' },
      ],
      listFilterPrice: [{ id: 'free', name: 'Free ticket' }, { id: '', name: 'Paid ticket' }],
    };
  }
  componentDidMount() {
    MySpinner.show();
    if (this.state.keySearch && this.state.keySearch !== '') {
      loadSearchByKeyword(this.state.keySearch)
        .then(dataSearch => {
          this.state.dataSearch = dataSearch;
          MySpinner.hide();
          this.forceUpdate();
        })
        .catch(err => {});
    }
    if (
      this.state.filterUpComming ||
      this.state.filterEventCategory ||
      this.state.filterPrice ||
      this.state.searchOpiton
    ) {
      loadSearchByOption(
        this.state.page,
        this.state.filterUpComming,
        this.state.filterEventCategory,
        this.state.filterPrice
      )
        .then(dataSearch => {
          this.state.dataSearch = dataSearch;
          MySpinner.hide();
          this.forceUpdate();
        })
        .catch(err => {});
    }
  }

  // componentDidUpdate(nextProps, nextState) {
  //   console.log('dauphaiphat: SuccessSearchComponent -> componentWillUpdate -> nextState', nextState);
  //   console.log(
  //     'dauphaiphat: SuccessSearchComponent -> componentWillUpdate -> this.state.filterUpComming',
  //     this.state.filterUpComming
  //   );
  //   console.log(
  //     'dauphaiphat: SuccessSearchComponent -> componentWillUpdate -> nextState.filterUpComming',
  //     nextState.filterUpComming
  //   );
  //   if (this && this.state) {
  //     if (
  //       this.state.filterUpComming !== nextState.filterUpComming ||
  //       this.state.filterEventCategory !== nextState.this.state.filterEventCategory ||
  //       this.state.filterPrice !== nextState.this.state.filterPrice
  //     ) {
  //       loadSearchByOption(this.state.filterUpComming, this.state.filterEventCategory, this.state.filterPrice)
  //         .then(dataSearch => {
  //           console.log('dauphaiphat: SuccessSearchComponent -> componentDidMount -> dataSearch', dataSearch);
  //           this.state.dataSearch = dataSearch;
  //           MySpinner.hide();
  //           this.forceUpdate();
  //         })
  //         .catch(err => {});
  //     }
  //   }
  // }
  onRefresh = () => {
    if (this.state.searchOpiton) {
      this.setState({ refreshing: true });
      loadSearchByOption(
        this.state.page,
        this.state.filterUpComming,
        this.state.filterEventCategory,
        this.state.filterPrice
      )
        .then(dataSearch => {
          console.log('dauphaiphat: SuccessSearchComponent -> componentDidMount -> dataSearch3', dataSearch);
          this.setState({ refreshing: false });
          this.state.dataSearch = dataSearch;
          MySpinner.hide();
          this.forceUpdate();
        })
        .catch(err => {});
    } else {
      this.setState({ refreshing: true });
      loadSearchByKeyword(this.state.keySearch)
        .then(dataSearch => {
          this.setState({ refreshing: false });
          this.state.dataSearch = dataSearch;
          this.forceUpdate();
          MySpinner.hide();
        })
        .catch(err => {});
    }
  };
  // handleLoadMore = () => {
  //   if (this.state.outOfData || this.state.loading) {
  //     return;
  //   }
  //   this.setState({ loading: true });
  //   console.log('dauphaiphat: SuccessSearchComponent -> handleLoadMore -> this.state.page', this.state.page);

  //   loadSearchByOption(
  //     this.state.searchOpiton
  //       ? (this.state.page, this.state.filterUpComming, this.state.filterEventCategory, this.state.filterPrice)
  //       : (this.state.keySearch, this.state.page)
  //   )
  //     .then(dataSearch => {
  //       if (dataSearch.length === 0) {
  //         this.setState({
  //           loading: false,
  //           outOfData: true,
  //         });
  //       } else {
  //         this.setState(previousState => {
  //           console.log('dauphaiphat: SuccessSearchComponent -> handleLoadMore -> previousState', previousState);
  //           return {
  //             dataSearch: [...this.state.dataSearch, ...dataSearch],
  //             loading: false,
  //             page: previousState.page + 1,
  //           };
  //         });
  //       }
  //     })
  //     .catch(err => this.setState({ loading: false }));
  // };

  renderFooter = () => {
    if (this.state.outOfData) {
      return null;
    }
    if (this.state.dataSearch.length === 0) {
      return (
        <LottieView
          source={require('../../assets/isempty.json')}
          autoPlay
          loop
          hardwareAccelerationAndroid
          style={{
            width: 200 * SCALE_RATIO_WIDTH_BASIS,
            height: 300 * SCALE_RATIO_WIDTH_BASIS,
            alignSelf: 'center',
          }}
        />
      );
    }

    return (
      this.state.loading && (
        <View
          style={{
            paddingTop: 8 * SCALE_RATIO_WIDTH_BASIS,
            marginBottom: 20 * SCALE_RATIO_WIDTH_BASIS,
          }}
        >
          <ActivityIndicator size='small' style={{ alignSelf: 'center' }} />
        </View>
      )
    );
  };

  renderItem = ({ item, index }) => <ItemList item={item} navigation={this.props.navigation} />;

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          iconColor={APP_COLOR_TEXT}
          noShadow
          styleBody={{ textAlign: 'left' }}
          bodyTitle={this.state.keySearch ? `Search "${this.state.keySearch}"` : 'Search'}
          onPress={() => this.props.navigation.goBack()}
        />
        {this.state.searchOpiton ? (
          <View
            style={{
              marginTop: -10 * SCALE_RATIO_HEIGHT_BASIS,
              paddingBottom: 5 * SCALE_RATIO_HEIGHT_BASIS,
              height: 30 * SCALE_RATIO_HEIGHT_BASIS,
              borderBottomWidth: 1,
              borderBottomColor: APP_COLOR_BORDER,
            }}
          >
            <ScrollView style={{ flexDirection: 'row' }} horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  height: 25 * SCALE_RATIO_HEIGHT_BASIS,
                  flex: 1,
                  alignSelf: 'flex-start',
                  marginLeft: 20 * SCALE_RATIO_WIDTH_BASIS,
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#f7f7f7',
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
                  padding: 3 * SCALE_RATIO_WIDTH_BASIS,
                  borderColor: APP_COLOR_BORDER,
                  borderWidth: 1,
                }}
              >
                <Feather
                  name='map'
                  size={FS(16)}
                  color='#727272'
                  style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
                />
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterUpComming' })}
                  style={[
                    style.text,
                    {
                      color: '#727272',
                      fontFamily: FONT.Medium,
                    },
                  ]}
                >
                  {this.state.filterUpComming === ''
                    ? 'All'
                    : this.state.listFilterUpComming.map(e => e.id === this.state.filterUpComming && e.name)}
                </Text>
              </View>

              <View
                style={{
                  height: 25 * SCALE_RATIO_HEIGHT_BASIS,
                  flex: 1,
                  alignSelf: 'flex-start',
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#f7f7f7',
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
                  padding: 3 * SCALE_RATIO_WIDTH_BASIS,
                  borderColor: APP_COLOR_BORDER,
                  borderWidth: 1,
                }}
              >
                <Entypo
                  name='location'
                  size={FS(16)}
                  color='#727272'
                  style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
                />
                <Text
                  onPress={() => {}}
                  style={[
                    style.text,
                    {
                      color: '#727272',
                      fontFamily: FONT.Medium,
                    },
                  ]}
                >
                  Hồ Chí Minh
                </Text>
              </View>

              <View
                style={{
                  height: 25 * SCALE_RATIO_HEIGHT_BASIS,
                  flex: 1,
                  alignSelf: 'flex-start',
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#f7f7f7',
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
                  padding: 3 * SCALE_RATIO_WIDTH_BASIS,
                  borderColor: APP_COLOR_BORDER,
                  borderWidth: 1,
                }}
              >
                <MaterialCommunityIcons
                  name='tag-multiple'
                  size={FS(20)}
                  color='#727272'
                  style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
                />
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterEventCategory' })}
                  style={[
                    style.text,
                    {
                      color: '#727272',
                      fontFamily: FONT.Medium,
                    },
                  ]}
                >
                  {this.state.filterEventCategory === ''
                    ? 'All'
                    : this.props.listCategory.map(e => e.id === this.state.filterEventCategory && e.name)}
                </Text>
              </View>

              <View
                style={{
                  height: 25 * SCALE_RATIO_HEIGHT_BASIS,
                  flex: 1,
                  alignSelf: 'flex-start',
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#f7f7f7',
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
                  padding: 3 * SCALE_RATIO_WIDTH_BASIS,
                  borderColor: APP_COLOR_BORDER,
                  borderWidth: 1,
                }}
              >
                <MaterialIcons
                  name='attach-money'
                  size={FS(20)}
                  color='#727272'
                  style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
                />
                <Text
                  onPress={() => this.setState({ filterSearch: true, filter: 'filterPrice' })}
                  style={[
                    style.text,
                    {
                      color: '#727272',
                      fontFamily: FONT.Medium,
                    },
                  ]}
                >
                  {this.state.filterPrice === ''
                    ? 'All'
                    : this.state.listFilterPrice.map(e => e.id === this.state.filterPrice && e.name)}
                </Text>
              </View>
            </ScrollView>
          </View>
        ) : null}
        <FlatList
          style={{ paddingTop: 15 * SCALE_RATIO_WIDTH_BASIS }}
          showsVerticalScrollIndicator={false}
          data={this.state.dataSearch}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.01}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
        />
        {/* <Modal
          style={{ flex: 1 }}
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
                position: 'absolute',
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
                position: 'absolute',
              }}
              start={{ x: 0.1, y: 0.75 }}
              end={{ x: 0.75, y: 0.25 }}
              colors={[`${APP_COLOR}90`, `${APP_COLOR_2}60`]}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <HeaderWithBackButtonComponent noShadow onPress={() => this.setState({ filterSearch: false })} />
              {this.state.filter === 'filterUpComming' && (
                <View
                  style={{
                    marginTop: 60 * SCALE_RATIO_WIDTH_BASIS,
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold,
                      },
                    ]}
                  >
                    Upcomming
                  </Text>
                  <View style={{ marginTop: 40 * SCALE_RATIO_WIDTH_BASIS }}>
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === '' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='All'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterUpComming === ''}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
                      size={18}
                      onPress={() => {
                        this.setState({ filterUpComming: '' });
                      }}
                    />
                    <CheckBox
                      textStyle={[
                        style.text,
                        {
                          color: this.state.filterUpComming === 'Today' ? APP_COLOR : APP_COLOR_TEXT,
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='Today'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterUpComming === 'Today'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='Tomorrow'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterUpComming === 'Tomorrow'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='This weekend'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterUpComming === 'This weekend'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold,
                      },
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='All'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterEventCategory === 'All'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                            fontSize: FS(22),
                          },
                        ]}
                        containerStyle={{
                          justifyContent: 'space-between',
                          borderWidth: 0,
                          backgroundColor: 'transparent',
                          paddingLeft: 0,
                          marginLeft: 0,
                        }}
                        title={e.name}
                        iconRight
                        iconType='material'
                        checkedIcon='check'
                        uncheckedIcon=''
                        checked={this.state.filterEventCategory === e.name}
                        checkedColor={APP_COLOR}
                        uncheckedColor='tranparent'
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
                    paddingHorizontal: 60 * SCALE_RATIO_WIDTH_BASIS,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        fontSize: FS(32),
                        color: APP_COLOR_BLUE_2,
                        fontFamily: FONT.Bold,
                      },
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='All'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterPrice === 'All'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='Free ticket'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterPrice === 'Free ticket'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
                          fontSize: FS(22),
                        },
                      ]}
                      containerStyle={{
                        justifyContent: 'space-between',
                        borderWidth: 0,
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                        marginLeft: 0,
                      }}
                      title='Paid ticket'
                      iconRight
                      iconType='material'
                      checkedIcon='check'
                      uncheckedIcon=''
                      checked={this.state.filterPrice === 'Paid ticket'}
                      checkedColor={APP_COLOR}
                      uncheckedColor='tranparent'
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
       */}
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({ listCategory: state.categoryReducer.listCategory });

export default connect(
  mapStateToProps,
  mapActionCreators
)(SuccessSearchComponent);
