import LottieView from 'lottie-react-native';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import { connect } from 'react-redux';
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  FS,
  SCALE_RATIO_HEIGHT_BASIS,
  SCALE_RATIO_WIDTH_BASIS,
} from '../../constants/Constants';
import style, {
  APP_COLOR,
  APP_COLOR_2,
  APP_COLOR_BORDER,
  APP_COLOR_TEXT,
  APP_COLOR_TEXT_GRAY_2,
  FONT,
} from '../../constants/style';
import HeaderWithBackButtonComponent from '../../view/HeaderWithBackButtonComponent';
import MyComponent from '../../view/MyComponent';
import { getNotification, readNotification, resetNotification } from './NotificationActions';

class NotificationComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      isLoadMore: false,
      modalVisible: false,
      titleModal: '',
      descriptionModal: '',
    };
    this.page = 1;
    this.outOfData = false;
    this.onRefresh = this.onRefresh.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.onReadNotification = this.onReadNotification.bind(this);
  }

  async onReadNotification(notificationId, status) {
    this.setState({ modalVisible: true });
    if (status === 0) {
      await readNotification(this.props.token, notificationId);
      this.props.resetNotification(1, () => this.setState({ refreshing: false }));
    }

    this.forceUpdate();
  }
  onRefresh() {
    this.page = 1;
    this.outOfData = false;
    this.setState({ refreshing: true });
    this.props.resetNotification(1, () => this.setState({ refreshing: false }));
  }

  handleLoadMore() {
    if (this.outOfData || this.state.isLoadMore) return;
    this.page++;
    this.setState({ isLoadMore: true });
    this.props.getNotification(
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
    if (this.props.listNotification.length === 0) {
      return (
        <LottieView
          source={require('../../assets/isempty.json')}
          autoPlay
          loop
          hardwareAccelerationAndroid
          style={{
            width: 240 * SCALE_RATIO_WIDTH_BASIS,
            height: 300 * SCALE_RATIO_WIDTH_BASIS,
            alignSelf: 'center',
          }}
        />
      );
    }
    return null;
  };

  renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() => {
          this.onReadNotification(item.id, item.status);
          this.setState({ titleModal: item.title.trim(), descriptionModal: item.description.trim() });
        }}
        style={{
          backgroundColor: 'white',
          paddingVertical: 10 * SCALE_RATIO_HEIGHT_BASIS,
          borderBottomColor: APP_COLOR_BORDER,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
        }}
      >
        <FontAwesome5
          name='user-tie'
          color={item.status === 0 ? APP_COLOR : `${APP_COLOR}30`}
          size={FS(32)}
          style={{ paddingLeft: 20 * SCALE_RATIO_WIDTH_BASIS }}
        />
        <View style={{ paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS }}>
          <Text
            style={[style.text, { color: item.status === 0 ? APP_COLOR_TEXT : APP_COLOR_TEXT_GRAY_2 }]}
            numberOfLines={5}
          >
            {item.id} {item.title.trim()}
          </Text>
          <Text style={[style.textCaption, { color: APP_COLOR_TEXT_GRAY_2 }]} numberOfLines={2}>
            {item.description.trim()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
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
            marginTop: 80 * SCALE_RATIO_HEIGHT_BASIS,
          }}
        >
          <SimpleLineIcons
            name='bell'
            color='white'
            size={FS(32)}
            style={{ marginRight: 10 * SCALE_RATIO_WIDTH_BASIS }}
          />
          <TextInput
            editable={false}
            placeholder='Notification'
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
            marginBottom: 10 + 2 * getBottomSpace(),
          }}
          data={this.props.listNotification.sort((a, b) => a.status - b.status).sort((a, b) => b.id - a.id)}
          renderItem={this.renderItem}
          onRefresh={this.onRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.01}
          ListFooterComponent={this.renderFooter}
        />
        <Modal
          onBackdropPress={() => this.setState({ modalVisible: false })}
          onSwipe={() => this.setState({ modalVisible: false })}
          swipeDirection={'down'}
          swipeThreshold={20}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: APP_COLOR_TEXT_GRAY_2,
              borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 30 * SCALE_RATIO_WIDTH_BASIS,
              paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
              // width: DEVICE_WIDTH * 0.7,
              // height: DEVICE_WIDTH * 0.7,
              backgroundColor: 'white',
            }}
          >
            <Text style={[style.textCaption, { fontSize: FS(18), textAlign: 'center' }]}> {this.state.titleModal}</Text>

            <Text
              style={[
                style.text,
                { fontSize: FS(12), textAlign: 'center', marginVertical: 15 * SCALE_RATIO_WIDTH_BASIS },
              ]}
            >
              {this.state.descriptionModal}
            </Text>
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,

                  backgroundColor: APP_COLOR,
                  borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
                  paddingHorizontal: 30 * SCALE_RATIO_WIDTH_BASIS,
                  paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
                }}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text
                  style={[
                    style.textCaption,
                    {
                      textAlign: 'center',
                      fontFamily: FONT.Bold,
                      fontSize: FS(14),
                      color: '#fff',
                    },
                  ]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const mapActionCreators = { resetNotification, getNotification };

const mapStateToProps = state => ({
  token: state.user.token,
  listNotification: state.user.listNotification,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(NotificationComponent);
