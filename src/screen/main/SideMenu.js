import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Alert, BackHandler, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { FS, ROUTE_KEY, SCALE_RATIO_HEIGHT_BASIS, SCALE_RATIO_WIDTH_BASIS } from '../../constants/Constants';
import strings from '../../constants/Strings';
import style, { APP_COLOR_TEXT } from '../../constants/style';
import global from '../../utils/globalUtils';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCategory: 0,
      listCategory: global.listCategory,
      magicHeight: 0
    };
  }

  navigateToScreen = (navigation, route, params) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params
    });
    navigation.dispatch(navigateAction);
  };

  _head(item, navigation) {
    return (
      <Text
        onPress={() => {
          this.setState({ magicHeight: item.index });
          this.navigateToScreen(this.props.navigation, ROUTE_KEY.ALBUM, {
            albumName:
              this.state.listCategory && this.state.listCategory[item.index] && this.state.listCategory[item.index].name
                ? this.state.listCategory[item.index].name
                : '',
            albumId:
              this.state.listCategory && this.state.listCategory[item.index] && this.state.listCategory[item.index].id
                ? this.state.listCategory[item.index].id
                : ''
          });
        }}
        style={[
          style.text,
          {
            color: '#797979',
            fontSize: FS(16),
            textAlign: 'left',
            fontWeight: '500',
            borderBottomWidth: 1,
            borderColor: '#70707030',
            paddingBottom: 10 * SCALE_RATIO_WIDTH_BASIS,
            marginTop: 10 * SCALE_RATIO_HEIGHT_BASIS
          }
        ]}
      >
        <Text
          style={{
            fontSize: FS(20),
            color: '#797979'
          }}
        >
          ▪
        </Text>{' '}
        {item.item.name}
      </Text>
    );
  }

  _body(item, navigation) {
    return (
      <View
        style={{
          flex: 1,
          marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS,
          height: this.state.magicHeight === item.index ? null : 0
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          data={item.item.children}
          keyExtractor={e => e.id}
          renderItem={e => (
            <Text
              onPress={() => {
                this.navigateToScreen(navigation, ROUTE_KEY.ALBUM, { albumName: e.item.name, albumId: e.item.id });
                // this.props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
              style={[
                style.text,
                {
                  color: '#797979',
                  marginTop: 15 * SCALE_RATIO_HEIGHT_BASIS
                }
              ]}
            >
              {e.item.name}
            </Text>
          )}
        />
      </View>
    );
  }
  renderItem(item, navigation) {
    return (
      <View style={{ flex: 1 }}>
        {this._head(item, navigation)}
        {this._body(item, navigation)}
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <StatusBar backgroundColor={this.state.color} barStyle="light-content" /> */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 6 * SCALE_RATIO_HEIGHT_BASIS, paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS }}
        >
          <View
            style={[
              {
                marginTop: 15 * SCALE_RATIO_WIDTH_BASIS,
                borderColor: '#DDDDDD',
                borderWidth: 1,
                width: '100%',
                backgroundColor: '#fff',
                height: 35 * SCALE_RATIO_WIDTH_BASIS,
                flexDirection: 'row'
              }
            ]}
          >
            <TextInput
              clearButtonMode="while-editing"
              placeholder="Nhập từ khóa..."
              placeholderTextColor="#999"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              style={{
                color: APP_COLOR_TEXT,
                flex: 7,
                height: 35 * SCALE_RATIO_WIDTH_BASIS,
                fontFamily: 'helveticaneue',
                fontSize: FS(14),
                marginLeft: 10 * SCALE_RATIO_WIDTH_BASIS
              }}
            />
            <View
              onPress={() => {}}
              style={{
                height: 35 * SCALE_RATIO_WIDTH_BASIS,
                padding: 3 * SCALE_RATIO_WIDTH_BASIS,
                backgroundColor: '#DDDDDD',
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MaterialIcons name="search" size={FS(16)} color="#333" style={{ padding: 5, alignSelf: 'center' }} />
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              data={this.state.listCategory}
              renderItem={item => this.renderItem(item, this.props.navigation)}
            />
            {/* <AccordionList
              // onToggle={index => {
              //   index,
              //     () =>
              //       this.navigateToScreen(this.props.navigation, ROUTE_KEY.ALBUM, {
              //         albumName:
              //           this.state.listCategory && this.state.listCategory[index] && this.state.listCategory[index].name
              //             ? this.state.listCategory[index].name
              //             : '',
              //         albumId:
              //           this.state.listCategory && this.state.listCategory[index] && this.state.listCategory[index].id
              //             ? this.state.listCategory[index].id
              //             : ''
              //       });
              // }}
              navigation={this.props.navigation}
              list={this.state.listCategory}
              header={item => this._head(item, this.props.navigation)}
              body={item => this._body(item, this.props.navigation)}
            /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  navItemStyle: {
    color: '#707070',
    fontSize: 14 * SCALE_RATIO_HEIGHT_BASIS,
    paddingLeft: 16 * SCALE_RATIO_WIDTH_BASIS
  },
  navSectionStyle: {
    height: 46 * SCALE_RATIO_HEIGHT_BASIS,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10 * SCALE_RATIO_HEIGHT_BASIS
  }
});

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => ({});
const mapActionCreators = {};

export default connect(
  mapStateToProps,
  mapActionCreators
)(SideMenu);
