/* eslint-disable import/imports-first */
import React from 'react';
import { FlatList, TextInput, View, ActivityIndicator } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FS,
  ROUTE_KEY,
  SCALE_RATIO_HEIGHT_BASIS,
  SCALE_RATIO_WIDTH_BASIS,
} from '../../constants/Constants';
import style, { APP_COLOR, APP_COLOR_2 } from '../../constants/style';
import ItemList from '../../view/ItemList';
import MyComponent from '../../view/MyComponent';
import { loadTicketEnd, resetTicketEnd } from './TicketEndActions';
import LottieView from 'lottie-react-native';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import { Text } from 'react-native-elements';

class TicketEndComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      isLoadMore: false,
    };
    this.page = 1;
    this.outOfData = false;
    this.onRefresh = this.onRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  componentDidMount() {
    this.props.resetTicketEnd(1);
  }
  onRefresh() {
    this.page = 1;
    this.outOfData = false;
    this.setState({ refreshing: true });
    this.props.resetTicketEnd(1, () => this.setState({ refreshing: false }));
  }

  handleLoadMore() {
    if (this.outOfData || this.state.isLoadMore) return;
    this.page++;
    this.setState({ isLoadMore: true });
    this.props.loadTicketEnd(
      this.page,
      () => this.setState({ isLoadMore: false }),
      () => {
        this.outOfData = true;
      }
    );
  }
  renderFooter = () => {
    if (!this.outOfData && this.state.isLoadMore) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator animating size='small' />
        </View>
      );
    }
    if (this.props.listTicketEnd.length === 0) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={[style.textHeader, { textAlign: 'center', color: APP_COLOR }]}>
            Buy event tickets filled with joy{' '}
          </Text>
          <LottieView
            source={require('../../assets/isempty.json')}
            autoPlay
            loop
            hardwareAccelerationAndroid
            resizeMode='contain'
            style={{
              width: 200 * SCALE_RATIO_WIDTH_BASIS,
              height: 300 * SCALE_RATIO_WIDTH_BASIS,
              alignSelf: 'center',
            }}
          />
        </View>
      );
    }
    return null;
  };

  renderItem = ({ item, index }) => {
    const res = { Qr_code: item.qr_code };
    return (
      <ItemList
        item={item}
        navigation={this.props.navigation}
        onPress={() =>
          this.props.navigation.navigate(ROUTE_KEY.DETAIL_PAY_SUCESS, {
            item,
            res,
          })
        }
      />
    );
  };
  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <HeaderWithBackButtonComponent
          noShadow
          styleContent={{ position: 'absolute', zIndex: 999 }}
          onPress={() => this.props.navigation.goBack()}
          styleIcon={{}}
        />
        <View style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, position: 'absolute' }}>
          <LinearGradient
            style={{
              top: DEVICE_WIDTH + 40,
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
          <LinearGradient
            style={{
              top: -(DEVICE_WIDTH * 1),
              left: -(DEVICE_WIDTH * 0.4),
              width: DEVICE_WIDTH * 1.5,
              height: DEVICE_WIDTH * 1.5,
              borderRadius: DEVICE_WIDTH,
              position: 'absolute',
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
              position: 'absolute',
            }}
            start={{ x: 0.1, y: 0.75 }}
            end={{ x: 0.75, y: 0.25 }}
            colors={[`${APP_COLOR}60`, `${APP_COLOR_2}60`]}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 80 * SCALE_RATIO_WIDTH_BASIS,
          }}
        >
          <FontAwesome
            name='history'
            color='white'
            size={FS(32)}
            style={{ marginRight: 10 * SCALE_RATIO_WIDTH_BASIS }}
          />
          <TextInput
            editable={false}
            placeholder='History'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
            autoCapitalize='none'
            style={[
              style.textCaption,
              {
                borderBottomWidth: this.state.onFocus ? 1 : 0,
                borderColor: 'white',
                flex: 1,
                fontSize: FS(32),
                color: 'white',
                letterSpacing: 3,
              },
            ]}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: DEVICE_WIDTH * 1.5 - DEVICE_WIDTH - 80 * SCALE_RATIO_HEIGHT_BASIS - FS(32),
            paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            marginBottom: 10 + 2 * getBottomSpace(),
          }}
          data={this.props.listTicketEnd}
          renderItem={this.renderItem}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.01}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
const mapActionCreators = { loadTicketEnd, resetTicketEnd };

const mapStateToProps = state => ({
  listTicketEnd: state.user.listTicketEnd,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(TicketEndComponent);
