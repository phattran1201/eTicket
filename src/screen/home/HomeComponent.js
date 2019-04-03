import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

import { DEVICE_WIDTH, SCALE_RATIO_WIDTH_BASIS, FS, ROUTE_KEY } from '../../constants/Constants';
import style from '../../constants/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation';
import global from '../../utils/globalUtils';
import { loadAlbumById, loadCategory } from '../splash/SplashActions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MyImage from '../../view/MyImage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumById: [],
      categoryId: null
    };
    this.categoryId =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.params &&
      this.props.navigation.state.params.categoryId
        ? this.props.navigation.state.params.categoryId
        : global.categoryId;
  }

  componentWillMount() {
    loadCategory()
      .then(albumById => {
        this.state.albumById = albumById;
        this.forceUpdate();
        // this.setState(previousState => ({
        //   loading: false,
        //   page: 2
        // }));
      })
      .catch(err => {
        // this.setState({ loading: false });
      });
  }
  renderItem = ({ item, index }) => {
    const name = item && item.name ? item.name : '';
    const id = item && item.id ? item.id : '';
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(ROUTE_KEY.ALBUM, { albumName: name, albumId: id });
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
          source={{
            uri:
              'https://s3-ap-southeast-1.amazonaws.com/trelangkienviet/album-feature/1546075052077 - bia-cang-bai-vong (2).jpg'
          }}
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
          <Text style={style.text}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingTop: getStatusBarHeight(),
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
                textAlign: 'left',
                fontWeight: '500',
                marginHorizontal: 20 * SCALE_RATIO_WIDTH_BASIS
              }
            ]}
            numberOfLines={2}
          >
            CATEGORY
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            // onPress={this.context.drawer.open}
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
          ref="albumById"
          initialNumToRender={10}
          data={this.state.albumById}
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
