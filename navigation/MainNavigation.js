import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../common/Color';
import { useDispatch, useSelector } from 'react-redux';
import SittersProfile from '../screens/sitters/SittersProfile';
import SitterDetails from '../screens/sitters/SitterDetails';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/user/StartupScreen';
import * as authActions from '../store/actions/auth';
import BookingSitter from '../screens/sitters/BookingSitter';
import ProfileScreen from '../screens/user/Profile';
import { Icon } from 'native-base';
import CustomDrawerContentComponent from '../components/layouts/CustomDrawer';
import History from '../screens/user/History';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? 'purple' : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'purple'
};

const SitterNavigator = createStackNavigator(
  {
    SittersOverview: SittersProfile,
    SitterDetails: SitterDetails,
    Booking: BookingSitter
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name='home' size={23} color={drawerConfig.headerTintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name='contact' size={23} color={drawerConfig.headerTintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const BookingNavigator = createStackNavigator(
  {
    Bookings: History
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Icon name='clipboard' size={23} color={drawerConfig.headerTintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigation = createDrawerNavigator(
  {
    Home: SitterNavigator,
    Profile: ProfileNavigator,
    Bookings: BookingNavigator
  },
  {
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#e6e6e6'
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const HomeNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Main: MainNavigation
});

export default createAppContainer(HomeNavigator);
