import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/dist/Feather';
import { connect } from 'react-redux';
import { FS, SCALE_RATIO_WIDTH_BASIS, ROUTE_KEY, DEVICE_WIDTH } from '../../constants/Constants';
import style, { APP_COLOR, APP_COLOR_BLUE_2, APP_COLOR_TEXT, APP_COLOR_2, FONT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

class SuccessSearchComponent extends MyComponent {
  constructor(props) {
    super(props);
    const { keySearch, filterUpComming, filterEventCategory, filterPrice } = this.props.navigation.state.params;
    this.state = {
      filterSearch: false,
      filter: '',
      keySearch,
      filterUpComming,
      filterEventCategory,
      filterPrice
    };
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          iconColor={APP_COLOR_TEXT}
          noShadow
          styleBody={{ textAlign: 'left' }}
          bodyTitle={this.state.skeySearch ? `Search "${this.state.keySearch}"` : 'Search'}
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
              onPress={() => this.setState({ filterSearch: true, filter: 'filterUpComming' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterUpComming}
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
              onPress={() => {}}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              Hồ Chí Minh
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
              onPress={() => this.setState({ filterSearch: true, filter: 'filterEventCategory' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterEventCategory}
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
              onPress={() => this.setState({ filterSearch: true, filter: 'filterPrice' })}
              style={[
                style.text,
                {
                  color: '#727272',
                  fontFamily: FONT.SemiBold
                }
              ]}
            >
              {this.state.filterPrice}
            </Text>
          </View>
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
              <HeaderWithBackButtonComponent noShadow onPress={() => this.setState({ filterSearch: false })} />
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

const mapStateToProps = state => ({ listCategory: state.categoryReducer.listCategory });

export default connect(
  mapStateToProps,
  mapActionCreators
)(SuccessSearchComponent);
