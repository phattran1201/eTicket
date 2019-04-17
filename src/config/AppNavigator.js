/* eslint-disable max-line-length */
/* eslint-disable import/imports-first */
import React from 'react';
import { Animated, BackHandler, Easing, NativeModules } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { ROUTE_KEY } from '../constants/Constants';
import MainComponent from '../screen/main/MainComponent';
import SideMenu from '../screen/main/SideMenu';
import SplashComponent from '../screen/splash/SplashComponent';
import global from '../utils/globalUtils';
import DetailPaySucessComponent from '../screen/detailPay/DetailPaySucessComponent';
import DetailPayComponent from '../screen/detailPay/DetailPayComponent';
import DetailEventComponent from '../screen/detailEvent/DetailEventComponent';
import SearchComponent from '../screen/search/SearchComponent';
import FilterSearchComponent from '../screen/search/FilterSearchComponent';
import SuccessSearchComponent from '../screen/search/SuccessSearchComponent';
import PreLoginComponent from '../screen/login/PreLoginComponent';
import LoginComponent from '../screen/login/LoginComponent';
import RegisterComponent from '../screen/login/RegisterComponent';
import PersonalInfoComponent from '../screen/profile/PersonalInfoComponent';
import TicketComponent from '../screen/ticket/TicketComponent';

const routeAppConfiguration = {
  [ROUTE_KEY.SPLASH]: {
    screen: SplashComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.MAIN]: {
    screen: MainComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.PRE_LOGIN]: {
    screen: PreLoginComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.LOGIN]: {
    screen: LoginComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.REGISTER]: {
    screen: RegisterComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },

  [ROUTE_KEY.DETAIL_EVENT]: {
    screen: DetailEventComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.DETAIL_PAY]: {
    screen: DetailPayComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.DETAIL_PAY_SUCESS]: {
    screen: DetailPaySucessComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.SEARCH]: {
    screen: SearchComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.SEARCH_FILTER]: {
    screen: FilterSearchComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.SEARCH_SUCCESS]: {
    screen: SuccessSearchComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.MENU]: {
    screen: SideMenu,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.PERSONAL_INFO]: {
    screen: PersonalInfoComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  [ROUTE_KEY.TICKET]: {
    screen: TicketComponent,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
};

const stackAppConfiguration = {
  initialRouteName: ROUTE_KEY.SPLASH,
  transitionConfig: TransitionConfiguration,
};

const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  return {
    opacity,
    transform: [{ scaleY }],
  };
};

const SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  });
  const slideFromRight = { transform: [{ translateX }] };
  return slideFromRight;
};
const slowFade = (index, position) => {
  const opacity = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 1],
  });
  return { opacity };
};

const TransitionConfiguration = () => ({
  transitionSpec: {
    duration: 500,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const width = layout.initWidth;
    const { index, route } = scene;
    const params = route.params || {}; // <- That's new
    const transition = params.transition || 'default'; // <- That's new
    return {
      collapseExpand: CollapseExpand(index, position),
      none: null,
      slowFade: slowFade(index, position),
      slideFromRight: SlideFromRight(index, position, width),
      default: slowFade(index, position),
    }[transition];
  },
});

const Navigator = createStackNavigator(routeAppConfiguration, stackAppConfiguration);
const prevGetStateForAction = Navigator.router.getStateForAction;

Navigator.router.getStateForAction = (action, state) => {
  if (
    action.type === 'Navigation/BACK' &&
    state &&
    (state.routes[state.index].routeName === ROUTE_KEY.MAIN || state.routes[state.index].routeName === ROUTE_KEY.SPLASH)
  ) {
    return state;
  }

  return prevGetStateForAction(action, state);
};

function backHandler() {
  if (global.isBackAndroidButtonPressed) {
    const MyBridge = NativeModules.MyBridge;
    if (MyBridge) {
      MyBridge.navigateToLauncher();
    }
  }
  global.isBackAndroidButtonPressed = true;
  setTimeout(() => {
    global.isBackAndroidButtonPressed = false;
  }, 500);
  return true;
}

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const AppNavigator = () => {
  BackHandler.addEventListener('hardwareBackPress', backHandler);
  return (
    <Navigator
      ref={nav => {
        rootNavigator = nav;
      }}
      onNavigationStateChange={(prevState, currentState) => {
        const currentScreen = getCurrentRouteName(currentState);
        if (currentScreen === ROUTE_KEY.MAIN || currentScreen === ROUTE_KEY.SPLASH) {
          BackHandler.addEventListener('hardwareBackPress', backHandler);
        } else {
          BackHandler.removeEventListener('hardwareBackPress', backHandler);
        }
      }}
    />
  );
};

export let rootNavigator = null;
export default AppNavigator;
