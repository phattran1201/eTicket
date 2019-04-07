import React from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { DEVICE_HEIGHT, FS, SCALE_RATIO_WIDTH_BASIS } from '../../constants/Constants';
import { DATA_TEST } from '../../constants/dataTest';
import style, { APP_COLOR, APP_COLOR_BLUE_2, APP_COLOR_TEXT, APP_COLOR_TEXT_GRAY_2, FONT } from '../../constants/style';
import MyComponent from '../../view/MyComponent';
import BaseHeader from '../../view/BaseHeader';

class DetailPaySucessComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeSlide: 0, loadDone: false, dialogVisible: false };
    this.store = DATA_TEST;
    this.data = DATA_TEST;
    this.isFirstTimeLoadNews = true;
    this.isFirstTimeLoadPromotion = true;
  }

  render() {
    const jsCode = `
            document.querySelector('#content').style.background = '#fff';
        document.querySelector('section.banner').style.display='none';
        document.querySelector('div.btn-contact-organizer').style.display='none';
        document.querySelector('section.ticket').style.display='none';
        document.querySelector('#navbarheader').style.display='none';
        document.querySelector('footer.footer').style.display='none';
    `;
    const url =
      'https://ticketbox.vn/event/satoshi-gogo-live-in-vietnam-2019-hanoi-74840?utm_medium=TKB&utm_source=TKBHomePage&utm_campaign=homepage_hot_14';

    return (
      <View style={{ backgroundColor: APP_COLOR, flex: 1, height: DEVICE_HEIGHT }}>
        <BaseHeader noShadow />
        <Image
          style={{
            position: 'absolute',
            top: -DEVICE_HEIGHT * 0.1,
            width: '100%'
          }}
          // source={require('../../assets/imgs/paydone.png')}
          resizeMode="contain"
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS, alignItems: 'center' }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 15
              }}
            >
              <MaterialCommunityIcons
                name="checkbox-marked-circle"
                style={{ marginTop: 5 }}
                size={20 * SCALE_RATIO_WIDTH_BASIS}
                color="#fff"
              />

              <Text style={[style.text, { fontSize: FS(16), fontcolor: '#fff' }]}>Order completed</Text>
            </View>
            <Text
              style={[
                style.textCaption,
                {
                  marginTop: 15,
                  marginBottom: 100,
                  fontSize: FS(24),
                  color: '#fff',
                  textAlign: 'center',
                  lineHeight: 30
                }
              ]}
            >
              HIGH PERFORMANCE WEB APP: FROM IDEA TO PRODUCTION
            </Text>
            {/* <Text style={[style.text, { fontSize: FS(12), color: APP_COLOR_TEXT, marginTop: 10 }]}>
              by Cybozu Viet Nam
            </Text> */}
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
              marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
              paddingBottom: 50
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
                marginTop: 25,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <FontAwesome
                  name="calendar"
                  style={{ marginTop: 5 }}
                  size={14 * SCALE_RATIO_WIDTH_BASIS}
                  color={APP_COLOR_TEXT}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>Monday, February 4</Text>
                  <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>
                    17:30 - 21:00
                  </Text>
                </View>
              </View>
              <Text style={[style.text, { fontSize: FS(14), fontcolor: APP_COLOR_BLUE_2 }]}>+ Add</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15 * SCALE_RATIO_WIDTH_BASIS,
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  flexDirection: 'row'
                }}
              >
                <FontAwesome
                  name="calendar"
                  style={{ marginTop: 5 }}
                  size={14 * SCALE_RATIO_WIDTH_BASIS}
                  color={APP_COLOR_TEXT}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={[style.text, { fontSize: FS(16), color: APP_COLOR_TEXT }]}>
                    The Tree Academy’s Office
                  </Text>
                  <Text style={[style.text, { fontSize: FS(10), fontcolor: APP_COLOR_TEXT_GRAY_2 }]}>
                    29 Huynh Van Banh Street Ward 17, Ho Chi Minh City
                  </Text>
                </View>
              </View>
              <Text style={[style.text, { fontSize: FS(14), fontcolor: APP_COLOR_BLUE_2 }]}> View</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            width: '90%',
            position: 'absolute',
            bottom: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignSelf: 'center',
            backgroundColor: '#fff',
            marginVertical: 20 * SCALE_RATIO_WIDTH_BASIS,
            marginHorizontal: 10 * SCALE_RATIO_WIDTH_BASIS,
            borderRadius: 3 * SCALE_RATIO_WIDTH_BASIS,
            paddingVertical: 15 * SCALE_RATIO_WIDTH_BASIS,
            alignItems: 'center'
          }}
          onPress={() => {
            // console.log('poi this.props.listNewsArticles:', this.props.listNewsArticles);
            // this.props.navigation.navigate(ROUTE_KEY.NEWS, {
            //   title: articleTitle,
            //   data: this.props.listNewsArticles
            // });
          }}
        >
          <Text
            style={[
              style.textCaption,
              {
                fontFamily: FONT.Bold,
                fontSize: FS(14),
                color: APP_COLOR
              }
            ]}
          >
            Continue Reading
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapActionCreators = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapActionCreators
)(DetailPaySucessComponent);
