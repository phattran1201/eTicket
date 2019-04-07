import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
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
  SCALE_RATIO_HEIGHT_BASIS
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
import { CheckBox } from 'react-native-elements';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';

class FilterSearchComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      activeSlide: 0,
      keySearch: '',
      isLoading: false,
      filterUpComming: global.filterUpComming,
      filterEventCategory: global.filterEventCategory,
      filterPrice: global.filterPrice
    };
  }
  render() {
    const { params } = this.props.navigation.state;
    const { filterUpComming, filterEventCategory, filterPrice } = this.state;
    console.log('dauphaiphat: FilterSearchComponent -> render -> this.props.navigation', this.props.navigation);

    return (
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
          <HeaderWithBackButtonComponent noShadow onPress={() => this.props.navigation.push(ROUTE_KEY.SEARCH)} />
          {params.filter === 'filterUpComming' && (
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
                      color: filterUpComming === '' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterUpComming === ''}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterUpComming = '';
                    this.setState({ filterUpComming: '' });
                  }}
                />
                <CheckBox
                  textStyle={[
                    style.text,
                    {
                      color: filterUpComming === 'today' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterUpComming === 'today'}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterUpComming = 'today';
                    this.setState({ filterUpComming: 'today' });
                  }}
                />
                <CheckBox
                  textStyle={[
                    style.text,
                    {
                      color: filterUpComming === 'tomorrow' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterUpComming === 'tomorrow'}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterUpComming = 'tomorrow';
                    this.setState({ filterUpComming: 'tomorrow' });
                  }}
                />
                <CheckBox
                  textStyle={[
                    style.text,
                    {
                      color: filterUpComming === 'thisWeekend' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterUpComming === 'thisWeekend'}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterUpComming = 'thisWeekend';
                    this.setState({ filterUpComming: 'thisWeekend' });
                  }}
                />
              </View>
            </View>
          )}
          {params.filter === 'filterEventCategory' && (
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
                      color: filterEventCategory === '' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterEventCategory === ''}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterEventCategory = '';
                    this.setState({ filterEventCategory: '' });
                  }}
                />
                {this.props.listCategory.map(e => (
                  <CheckBox
                    textStyle={[
                      style.text,
                      {
                        color: filterEventCategory === e.id ? APP_COLOR : APP_COLOR_TEXT,
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
                    checked={filterEventCategory === e.id}
                    checkedColor={APP_COLOR}
                    uncheckedColor="tranparent"
                    size={18}
                    onPress={() => {
                      global.filterEventCategory = e.id;
                      this.setState({ filterEventCategory: e.id });
                    }}
                  />
                ))}
              </View>
            </View>
          )}
          {params.filter === 'filterPrice' && (
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
                      color: filterPrice === '' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterPrice === ''}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterPrice = '';
                    this.setState({ filterPrice: '' });
                  }}
                />
                <CheckBox
                  textStyle={[
                    style.text,
                    {
                      color: filterPrice === 'Free ticket' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterPrice === 'Free ticket'}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterPrice = 'Free ticket';
                    this.setState({ filterPrice: 'Free ticket' });
                  }}
                />
                <CheckBox
                  textStyle={[
                    style.text,
                    {
                      color: filterPrice === 'Paid ticket' ? APP_COLOR : APP_COLOR_TEXT,
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
                  checked={filterPrice === 'Paid ticket'}
                  checkedColor={APP_COLOR}
                  uncheckedColor="tranparent"
                  size={18}
                  onPress={() => {
                    global.filterPrice = 'Paid ticket';
                    this.setState({ filterPrice: 'Paid ticket' });
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
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
)(FilterSearchComponent);
