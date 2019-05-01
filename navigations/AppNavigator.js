import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import Home from '../screens/Home';
import Setting from '../screens/Setting';
import NewActivity from '../screens/NewActivity';

const StackNavigator = createStackNavigator(
  {
    Activity: Home,
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
