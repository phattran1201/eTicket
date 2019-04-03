import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { DEVICE_WIDTH, SCALE_RATIO_WIDTH_BASIS, FS, ROUTE_KEY } from '../../constants/Constants';
import style from '../../constants/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { DrawerActions } from 'react-navigation';
import { loadAlbumById } from '../splash/SplashActions';
import MyImage from '../../view/MyImage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default class AlbumComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAlbum: []
    };
    this.albumId =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.albumId;
    this.albumName =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.albumName;
  }

  componentWillMount() {
    loadAlbumById(this.albumId)
      .then(listAlbum => {
        this.state.listAlbum = listAlbum;
        this.forceUpdate();
      })
      .catch(err => {});
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.navigation.state.params.albumId === nextProps.navigation.state.params.albumId) {
      return false;
    }
    return true;
  }
  componentWillUpdate(nextProps) {
    if (this.props.navigation.state.params.albumId !== nextProps.navigation.state.params.albumId) {
      this.albumId = nextProps.navigation.state.params.albumId;
      this.albumName = nextProps.navigation.state.params.albumName;
      loadAlbumById(this.albumId)
        .then(listAlbum => {
          this.state.listAlbum = listAlbum;
          this.forceUpdate();
        })
        .catch(err => {});
    }
  }

  renderItem = ({ item, index }) => {
    const title = item && item.title ? item.title : '';
    const featureImage =
      item && item.featureImage
        ? item.featureImage
        : 'https://s3-ap-southeast-1.amazonaws.com/trelangkienviet/album-feature/1546075052077 - bia-cang-bai-vong (2).jpg';
    const imageNumber = item && item.imageNumber ? item.imageNumber : 0;
    const view = item && item.view ? item.view : 0;
    const seoUrl = item && item.seoUrl ? item.seoUrl : 0;
    const albumId = item && item.id ? item.id : 0;
    const seoDescription = item && item.seoDescription ? item.seoDescription : '';
    console.log('dauphaiphat: AlbumComponent -> renderItem -> featureImage', featureImage);

    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(ROUTE_KEY.DETAIL_ABLUM, {
            title,
            seoUrl,
            albumId,
            seoDescription
          });
        }}
        style={[
          style.shadow,
          {
            backgroundColor: '#fff',
            flex: 1,
            maxWidth: (DEVICE_WIDTH * 46) / 100,
            marginVertical: (DEVICE_WIDTH * 2) / 100,
            marginLeft: index % 2 ? 0 : (DEVICE_WIDTH * 2.5) / 100,
            marginRight: index % 2 ? 0 : (DEVICE_WIDTH * 3) / 100,
            // borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
            paddingBottom: 5 * SCALE_RATIO_WIDTH_BASIS
          }
        ]}
      >
        <MyImage
          source={{ uri: featureImage }}
          style={{
            height: 150 * SCALE_RATIO_WIDTH_BASIS,
            width: '100%'
          }}
        />
        <View
          style={{
            paddingVertical: 5 * SCALE_RATIO_WIDTH_BASIS,
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS
          }}
        >
          <FontAwesome5
            name="book"
            size={FS(16)}
            color="#333"
            style={{ flex: 1, marginTop: 5, paddingRight: 5 * SCALE_RATIO_WIDTH_BASIS }}
          />
          <View style={{ flex: 9 }}>
            <Text style={style.text}>{title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[style.text, { fontSize: FS(12) }]}>{imageNumber} Ảnh</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesome5
                  name="eye"
                  size={FS(10)}
                  color="#333"
                  style={{ paddingLeft: 20 * SCALE_RATIO_WIDTH_BASIS }}
                />
                <Text style={[style.text, { paddingLeft: 5 }]}>{view}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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
          <Text
            style={[
              style.text,
              {
                fontSize: FS(16),
                color: '#fff',
                flex: 8,
                fontWeight: '500',
                marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS
              }
            ]}
            numberOfLines={2}
          >
            {this.albumName}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            style={{
              backgroundColor: 'red',
              paddingVertical: 8 * SCALE_RATIO_WIDTH_BASIS,
              paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
              flex: 2
            }}
          >
            <Text style={[style.text, { fontSize: FS(15), color: '#fff', textAlign: 'center', fontWeight: '500' }]}>
              Thư Mục
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ref="listAlbum"
          initialNumToRender={10}
          data={this.state.listAlbum}
          keyExtractor={item => item.id}
          renderItem={(item, index) => this.renderItem(item, index)}
          numColumns={2}
          // ListFooterComponent={this.renderFooter}
          // onEndReached={this.handleLoadMore}
          // onEndReachedThreshold={0.01}
          // onRefresh={this.onRefresh}
          // refreshing={this.state.refreshing}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: getStatusBarHeight()
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
