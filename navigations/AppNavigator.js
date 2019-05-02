import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import Drawerable from '../screens/Drawerable';
import Setting from '../screens/Setting';
import NewActivity from '../screens/NewActivity';
import Layout from '../constants/Layout';

const { deviceWidth, deviceHeight } = Layout;

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
  },
  {
    drawerPosition: 'left',
    contentComponent: Drawerable,
    drawerWidth: 255,
    drawerType: 'front',
    drawerBackgroundColor: '#2F3235',
    overlayColor: '#fff',
  }
);

const StackNavigator = createStackNavigator(
  {
    Activity: DrawerNavigator,
    New: NewActivity,
  },
  {
    headerMode: 'none',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: StackNavigator,
    Setting: {
      screen: Setting,
    },
  },
  {
    initialRouteName: 'Home',
    labeled: false,
    defaultNavigationOptions: {
      tabBarVisible: false,
    },
  }
);

export default createAppContainer(TabNavigator);
