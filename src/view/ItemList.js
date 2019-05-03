import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { SCALE_RATIO_WIDTH_BASIS, FS, ROUTE_KEY } from '../constants/Constants';
import style, { APP_COLOR, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY } from '../constants/style';
import MyImage from './MyImage';
import moment from 'moment';
import { followEvent, unfollowEvent, getListFollowEvent } from '../screen/follow/FollowActions';
import { alert } from '../utils/alert';
import strings from '../constants/Strings';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextSate) {
    if (this.props.listFollow !== nextProps.listFollow) {
      return true;
    }
    return false;
  }

  onFollow(id) {
    followEvent(this.props.token, id)
      .then(res => {
        this.props.getListFollowEvent();
        this.forceUpdate();
        alert(strings.alert, 'Follow success');
      })
      .catch(err => {
        alert(strings.alert, 'Follow false');
      });
  }
  unFollow(id) {
    unfollowEvent(this.props.token, id)
      .then(res => {
        this.props.getListFollowEvent();
        this.forceUpdate();
        alert(strings.alert, 'Unfollow success');
      })
      .catch(err => {
        alert(strings.alert, 'Unfollow false');
      });
  }
  render() {
    const { item, onPress } = this.props;
    let minPrice =
      item.tickettype && item.tickettype.data && item.tickettype.data[0] && item.tickettype.data[0].price
        ? item.tickettype.data[0].price
        : 0;
    let maxPrice =
      item.tickettype && item.tickettype.data && item.tickettype.data[0] && item.tickettype.data[0].price
        ? item.tickettype.data[0].price
        : 0;
    for (let i = 1; i < item.tickettype.data.length; i++) {
      if (minPrice > item.tickettype.data[i].price) {
        minPrice = item.tickettype.data[i].price;
      }
    }
    for (let i = 1; i < item.tickettype.data.length; i++) {
      if (maxPrice < item.tickettype.data[i].price) {
        maxPrice = item.tickettype.data[i].price;
      }
    }
    let isFollow = false;
    if (this.props.listFollow && this.props.listFollow !== null) {
      this.props.listFollow.forEach(e => {
        if (e.id === item.id) {
          isFollow = true;
        }
      });
    }
    return (
      <TouchableOpacity onPress={onPress || (() => this.props.navigation.navigate(ROUTE_KEY.DETAIL_EVENT, { item }))}>
        <TouchableOpacity
          onPress={() => (isFollow ? this.unFollow(item.id) : this.onFollow(item.id))}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
            right: 20,
            zIndex: 999,
          }}
        >
          <MaterialCommunityIcons
            name={isFollow ? 'heart' : 'heart-outline'}
            size={20 * SCALE_RATIO_WIDTH_BASIS}
            color={APP_COLOR}
            // style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
          />
        </TouchableOpacity>
        <View
          style={[
            {
              paddingHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
              marginBottom: 10 * SCALE_RATIO_WIDTH_BASIS,
              flex: 1,
              backgroundColor: 'white',
              overflow: 'hidden',
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
        >
          <View style={{ flex: 3 }}>
            <MyImage
              style={{
                borderRadius: 5 * SCALE_RATIO_WIDTH_BASIS,
                width: '100%',
                height: 86 * SCALE_RATIO_WIDTH_BASIS,
              }}
              source={{
                uri: item.image,
              }}
            />
          </View>
          <View style={{ flex: 6, paddingLeft: 5 * SCALE_RATIO_WIDTH_BASIS }}>
            <Text
              style={[
                style.textCaption,
                {
                  color: APP_COLOR_TEXT,
                  fontSize: FS(14),
                  padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                },
              ]}
              numberOfLines={2}
            >
              {item.title}
            </Text>

            <Text
              style={[
                style.textCaption,
                {
                  color: APP_COLOR_TEXT_GRAY,
                  fontSize: FS(10),
                  padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                },
              ]}
              numberOfLines={2}
            >
              {moment(item.end_date).format('ddd,MMMM')}
              {'  '}
              {item.start_time} - {item.end_time}:00
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ borderWidth: 0.5, borderColor: '#70707050', padding: 1, borderRadius: 3 }}>
                <Text
                  style={[
                    style.textCaption,
                    {
                      alignSelf: 'flex-start',
                      color: APP_COLOR_TEXT,
                      fontSize: FS(10),
                      padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.category}
                </Text>
              </View>
              {item.tickettype && item.tickettype.data && item.tickettype.data[0] && item.tickettype.data[0].price ? (
                item.tickettype.data.length === 1 ? (
                  <View
                    style={{
                      marginLeft: 5,
                      borderWidth: 0.5,
                      borderColor: APP_COLOR,
                      backgroundColor: item.tickettype.data[0].price < 1 ? APP_COLOR : 'white',
                      padding: 1,
                      borderRadius: 3,
                    }}
                  >
                    <Text
                      style={[
                        style.textCaption,
                        {
                          alignSelf: 'flex-start',
                          color: item.tickettype.data[0].price < 1 ? 'white' : APP_COLOR,
                          fontSize: FS(10),
                          padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                        },
                      ]}
                      numberOfLines={2}
                    >
                      {item.tickettype.data[0].price < 1 ? 'Free' : `From ${item.tickettype.data[0].price}`}
                    </Text>
                  </View>
                ) : (
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        marginLeft: 5,
                        borderWidth: 0.5,
                        borderColor: APP_COLOR,
                        backgroundColor: minPrice < 1 ? APP_COLOR : 'white',
                        padding: 1,
                        borderRadius: 3,
                      }}
                    >
                      <Text
                        style={[
                          style.textCaption,
                          {
                            alignSelf: 'flex-start',
                            color: minPrice < 1 ? 'white' : APP_COLOR,
                            fontSize: FS(10),
                            padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        {minPrice < 1 ? 'Free' : `From ${minPrice}`}
                      </Text>
                    </View>
                    <View
                      style={{
                        marginLeft: 5,
                        borderWidth: 0.5,
                        borderColor: APP_COLOR,
                        padding: 1,
                        borderRadius: 3,
                      }}
                    >
                      <Text
                        style={[
                          style.textCaption,
                          {
                            alignSelf: 'flex-start',
                            color: APP_COLOR,
                            fontSize: FS(10),
                            padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                          },
                        ]}
                        numberOfLines={2}
                      >
                        To ${maxPrice}
                      </Text>
                    </View>
                  </View>
                )
              ) : (
                <View
                  style={{
                    marginLeft: 5,
                    borderWidth: 0.5,
                    borderColor: APP_COLOR,
                    backgroundColor: APP_COLOR,
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Text
                    style={[
                      style.textCaption,
                      {
                        alignSelf: 'flex-start',
                        color: 'white',
                        fontSize: FS(10),
                        padding: 5 * SCALE_RATIO_WIDTH_BASIS,
                      },
                    ]}
                    numberOfLines={2}
                  >
                    Free null
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapActionCreators = { getListFollowEvent };

const mapStateToProps = state => ({
  token: state.user.token,
  userData: state.user.userData,
  listFollow: state.user.listFollow,
});

export default connect(
  mapStateToProps,
  mapActionCreators
)(ItemList);
