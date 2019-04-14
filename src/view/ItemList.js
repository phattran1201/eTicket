import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { SCALE_RATIO_WIDTH_BASIS, FS } from '../constants/Constants';
import style, { APP_COLOR, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY } from '../constants/style';
import MyImage from './MyImage';
import moment from 'moment';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { item } = this.props;
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

    return (
      <TouchableOpacity>
        <View
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
            name='heart-outline'
            size={20 * SCALE_RATIO_WIDTH_BASIS}
            color={APP_COLOR}
            style={{ marginBottom: -5 * SCALE_RATIO_WIDTH_BASIS }}
          />
        </View>
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
