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
  Animated,
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
  DEVICE_HEIGHT,
} from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, {
  APP_COLOR,
  APP_COLOR_2,
  APP_COLOR_TEXT,
  APP_COLOR_TEXT_GRAY,
  FONT,
  APP_COLOR_BLUE_2,
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
import { getBottomSpace } from 'react-native-iphone-x-helper';
import ItemList from '../../view/ItemList';
import { loadTicket } from './TicketActions';

class TicketComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentWillMount() {
    this.props.loadTicket();
  }
  shouldComponentUpdate(nextProps, nextSate) {
    if (this.props.listTicket !== nextProps.listTicket) {
      return true;
    }
    return false;
  }

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
    console.log(
      'dauphaiphat: TicketComponent -> shouldComponentUpdate -> this.props.listTicket',
      this.props.listTicket
    );

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
            marginTop: this.state.onFocus ? 150 * SCALE_RATIO_WIDTH_BASIS : 60 * SCALE_RATIO_HEIGHT_BASIS,
          }}
        >
          <FontAwesome
            name='ticket'
            color='white'
            size={FS(32)}
            style={{ marginRight: 10 * SCALE_RATIO_WIDTH_BASIS }}
          />
          <TextInput
            editable={false}
            placeholder='My ticket'
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
            marginTop: DEVICE_WIDTH * 1.5 - DEVICE_WIDTH - 80 * SCALE_RATIO_HEIGHT_BASIS,
            paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            marginBottom: 10 + 2 * getBottomSpace(),
          }}
          data={this.props.listTicket}
          renderItem={this.renderItem}
          // onRefresh={this.onRefresh}
          // refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.01}
          // ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
const mapActionCreators = { loadTicket };

const mapStateToProps = state => ({
  listTicket: state.user.listTicket,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(TicketComponent);
