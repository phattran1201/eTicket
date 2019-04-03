/* eslint-disable max-line-length */
import React, { Component } from 'react';
import { Alert, FlatList, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DEVICE_HEIGHT, DEVICE_WIDTH, FS, SCALE_RATIO_WIDTH_BASIS } from '../../constants/Constants';
import style from '../../constants/style';
import DetailViewableImage from '../../view/DetailViewableImage';
import { loadDetailAlbumById } from '../splash/SplashActions';

const { Popover } = renderers;

export default class DetailAlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listImage: []
    };
    this.seoUrl =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.seoUrl;
    this.albumId =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.albumId;
    this.title =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.title;
    this.seoDescription =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.seoDescription;
  }
  componentWillMount() {
    loadDetailAlbumById(this.seoUrl, this.albumId)
      .then(listImage => {
        this.state.listImage = listImage;
        this.forceUpdate();
      })
      .catch(err => {});
  }
  renderItem = ({ item }) => (
    <DetailViewableImage
      style={[
        style.shadow,
        {
          backgroundColor: '#fff',
          flex: 1,
          width: DEVICE_WIDTH / 4,
          height: DEVICE_WIDTH / 4,
          margin: SCALE_RATIO_WIDTH_BASIS
        }
      ]}
      source={{
        uri: item.img
          ? item.img
          : 'https://s3-ap-southeast-1.amazonaws.com/trelangkienviet/album-feature/1546075052077 - bia-cang-bai-vong (2).jpg'
      }}
      defaultSource={null}
      resizeMode="cover"
    />
  );

  onShare = async () => {
    try {
      const result = await Share.share({
        message: `${this.title}\nhttp://trelangkienviet.vn/chi-tiet-album/${this.seoUrl}--${this.albumId}.html`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert(error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isShowDescription ? (
          <ScrollView
            style={{
              position: 'absolute',
              zIndex: 999,
              width: DEVICE_WIDTH,
              height: DEVICE_HEIGHT,
              backgroundColor: '#fff'
            }}
          >
            <View
              style={{
                paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
                height: 50,
                backgroundColor: '#333',
                width: DEVICE_WIDTH,
                justifyContent: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ isShowDescription: false })}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <MaterialIcons name="arrow-back" size={FS(30)} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={[style.titleHeader, { paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS, marginTop: 10 }]}>
              {this.title}
            </Text>
            <Text style={[style.text, { paddingHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS, marginTop: 10 }]}>
              {this.seoDescription}
            </Text>
          </ScrollView>
        ) : null}

        <View
          style={{
            paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            height: 50,
            backgroundColor: '#333',
            width: DEVICE_WIDTH,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1 }}>
            <MaterialIcons name="chevron-left" size={FS(30)} color="#fff" style={{ alignSelf: 'center' }} />
          </TouchableOpacity>
          <Text
            style={[
              style.text,
              {
                fontSize: FS(16),
                color: '#fff',
                flex: 6,
                textAlign: 'center',
                fontWeight: '500',
                alignSelf: 'center',
                marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS
              }
            ]}
            numberOfLines={2}
          >
            {this.title}
          </Text>
          <View style={{ flex: 1 }}>
            <Menu renderer={Popover} rendererProps={{ placement: 'bottom' }}>
              <MenuTrigger>
                <MaterialIcons name="more-vert" size={FS(30)} color="#fff" style={{ alignSelf: 'center' }} />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => this.setState({ isShowDescription: true })}>
                  <Text
                    style={[
                      style.text,
                      { paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS, paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS }
                    ]}
                  >
                    Thông tin địa điểm
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => this.onShare()}>
                  <Text
                    style={[
                      style.text,
                      { paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS, paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS }
                    ]}
                  >
                    Chia sẻ
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          ref="listImage"
          initialNumToRender={10}
          data={this.state.listImage}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          numColumns={4}
          // ListFooterComponent={this.renderFooter}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.01}
          // onRefresh={this.onRefresh}
          // refreshing={this.state.refreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
