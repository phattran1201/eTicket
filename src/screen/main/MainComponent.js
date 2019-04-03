import React from 'react';
import { View, Image } from 'react-native';
import BottomNavigation, { Badge, IconTab } from 'react-native-material-bottom-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { connect } from 'react-redux';
import MyComponent from '../../view/MyComponent';
import HomeComponent from '../home/HomeComponent';

class MainComponent extends MyComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    activeTab: 'games'
  };

  tabs = [
    {
      key: 'games',
      icon: 'gamepad-variant',
      label: 'Games',
      barColor: '#388E3C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'movies-tv',
      icon: 'movie',
      label: 'Movies & TV',
      barColor: '#B71C1C',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'music',
      icon: 'music-note',
      label: 'Music',
      barColor: '#E64A19',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    }
  ];

  renderIcon = icon => ({ isActive }) => <MaterialCommunityIcons size={24} color="white" name={icon} />;

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      showBadge={tab.key === 'movies-tv'}
      renderBadge={() => <Badge>2</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <HomeComponent navigation={this.props.navigation} />
        </View>
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapActionCreators = {};

export default connect(
  mapStateToProps,
  mapActionCreators
)(MainComponent);
