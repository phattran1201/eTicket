import React from 'react';
import { StatusBar, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import BottomNavigation, { Badge, IconTab } from 'react-native-material-bottom-navigation';
import Feather from 'react-native-vector-icons/dist/Feather';
import { connect } from 'react-redux';
import { DEVICE_HEIGHT, DEVICE_WIDTH, SCALE_RATIO_HEIGHT_BASIS } from '../../constants/Constants';
import MyComponent from '../../view/MyComponent';
import MySpinner from '../../view/MySpinner';
import HomeComponent from '../home/HomeComponent';
import PersonalInfoComponent from '../profile/PersonalInfoComponent';
import SearchComponent from '../search/SearchComponent';
import { loadUserData } from '../profile/PersonalInfoActions';

class MainComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = { activeTab: 'home' };
  }

  tabs = [
    {
      key: 'home',
      icon: 'home',
      // label: 'Games',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'search',
      icon: 'search',
      // label: 'Games',
      barColor: '#462',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'heart',
      icon: 'heart',
      // label: 'Games',
      barColor: 'blue',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'ticket',
      icon: 'credit-card',
      // label: 'Movies & TV',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
    {
      key: 'more',
      icon: 'more-horizontal',
      // label: 'Music',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)',
    },
  ];

  componentDidMount() {
    this.props.loadUserData(this.props.token);
  }
  renderIcon = icon => ({ isActive }) => <Feather size={24} color='white' name={icon} />;

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      showBadge={tab.key === 'home'}
      renderBadge={() => <Badge>2</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );
  renderBody() {
    if (this.state.activeTab === 'home') {
      return <HomeComponent navigation={this.props.navigation} />;
    }
    if (this.state.activeTab === 'search') {
      return <SearchComponent navigation={this.props.navigation} />;
    }
    // if (this.state.activeTab === 'heart') {
    //   return <FilterSearchComponent navigation={this.props.navigation} />;
    // }
    if (this.state.activeTab === 'more') {
      return <PersonalInfoComponent navigation={this.props.navigation} />;
    }
    // return <DetailEventComponent navigation={this.props.navigation} />;
  }

  render() {
    return (
      <View
        style={{
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <MySpinner />

        <StatusBar backgroundColor={'#ffffff60'} barStyle='dark-content' translucent />
        <View style={{ height: DEVICE_HEIGHT - 56 + getBottomSpace(), paddingBottom: 30 * SCALE_RATIO_HEIGHT_BASIS }}>
          {this.renderBody()}
        </View>
        {/* <View style={{ position: 'absolute', top: 6, width: DEVICE_WIDTH, height: DEVICE_HEIGHT }}> */}
        <BottomNavigation
          style={{
            position: 'absolute',
            height: 56 + getBottomSpace(),
            bottom: 0,
            width: DEVICE_WIDTH,
            zIndex: 999,
          }}
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
        {/* </View> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({ token: state.user.token });

const mapActionCreators = { loadUserData };

export default connect(
  mapStateToProps,
  mapActionCreators
)(MainComponent);
