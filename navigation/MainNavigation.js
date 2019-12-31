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
        <Icon name='contact' size={23} color={drawerConfig.tintColor} />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigation = createDrawerNavigator(
  {
    Home: SitterNavigator,
    Profile: ProfileNavigator
  },
  {
    contentOptions: {
      activeTintColor: 'purple'
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title='Logout'
              color='red'
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
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
