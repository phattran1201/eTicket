import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/dist/Feather';
import { connect } from 'react-redux';
import { FS, SCALE_RATIO_WIDTH_BASIS, ROUTE_KEY } from '../../constants/Constants';
import style, { APP_COLOR, APP_COLOR_BLUE_2, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY_2, FONT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import global from '../../utils/globalUtils';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';

class SuccessSearchComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      loadDone: false,
      dialogVisible: false,
      filterUpComming: global.filterUpComming,
      filterEventCategory: global.filterEventCategory,
      filterPrice: global.filterPrice
    };
  }

  render() {
    const { keySearch } = this.props.navigation.state.params;
    console.log('dauphaiphat: SearchComponent -> render -> this.state.filterUpComming', this.state.filterUpComming);
    console.log(
      'dauphaiphat: SearchComponent -> render -> this.state.filterEventCategory',
      this.state.filterEventCategory
    );
    console.log('dauphaiphat: SearchComponent -> render -> this.state.filterPrice', this.state.filterPrice);
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          noShadow
          styleBody={{ textAlign: 'left' }}
          bodyTitle={keySearch ? `Search "${keySearch}"` : ''}
          onPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flexDirection: 'row' }} horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              marginLeft: 20 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#f7f7f7',
              borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
              padding: 3 * SCALE_RATIO_WIDTH_BASIS,
              borderColor: '#e1e1e1',
              borderWidth: 1
            }}
          >
            <Feather name="map" size={FS(16)} color="#727272" style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }} />
            <Text
              onPress={() => this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILTER, { filter: 'filterUpComming' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterUpComming || 'All'}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#f7f7f7',
              borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
              padding: 3 * SCALE_RATIO_WIDTH_BASIS,
              borderColor: '#e1e1e1',
              borderWidth: 1
            }}
          >
            <Entypo
              name="location"
              size={FS(16)}
              color="#727272"
              style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
            />
            <Text
              onPress={() => this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILTER, { filter: 'filterUpComming' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {'Hồ Chí Minh'}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#f7f7f7',
              borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
              padding: 3 * SCALE_RATIO_WIDTH_BASIS,
              borderColor: '#e1e1e1',
              borderWidth: 1
            }}
          >
            <MaterialCommunityIcons
              name="tag-multiple"
              size={FS(20)}
              color="#727272"
              style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
            />
            <Text
              onPress={() => this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILTER, { filter: 'filterUpComming' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterEventCategory === null
                ? 'ALL'
                : this.props.listCategory[this.state.filterEventCategory - 1].name}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignSelf: 'flex-start',
              marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#f7f7f7',
              borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 6 * SCALE_RATIO_WIDTH_BASIS,
              padding: 3 * SCALE_RATIO_WIDTH_BASIS,
              borderColor: '#e1e1e1',
              borderWidth: 1
            }}
          >
            <MaterialIcons
              name="attach-money"
              size={FS(20)}
              color="#727272"
              style={{ marginRight: 3 * SCALE_RATIO_WIDTH_BASIS }}
            />
            <Text
              onPress={() => this.props.navigation.navigate(ROUTE_KEY.SEARCH_FILTER, { filter: 'filterUpComming' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterPrice || 'All'}
            </Text>
          </View>
        </ScrollView>
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
