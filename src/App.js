import React from 'react';
import {Image, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import SearchScreen from './screens/SearchScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import store from './redux';
import {theme} from './utils/constants';

const Tab = createBottomTabNavigator();
const home_inactive = require('./assets/home_inactive.png');
const home_active = require('./assets/home_active.png');
const heart_active = require('./assets/heart_active.png');
const heart_inactive = require('./assets/heart_inactive.png');

const tabBarOptions = {
  activeTintColor: theme.primary,
  inactiveTintColor: theme.secondary,
  labelStyle: {
    fontSize: 14,
  },
  keyboardHidesTabBar: true,
};

function getScreenOptions({route}) {
  return {
    tabBarIcon: ({focused, color, size}) => {
      let icon;
      if (route.name === 'Home') {
        icon = focused ? home_active : home_inactive;
      } else if (route.name === 'Favourites') {
        icon = focused ? heart_active : heart_inactive;
      }
      return <Image source={icon} style={{width: 20, height: 20}} />;
    },
  };
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={theme.primary} barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={getScreenOptions}
          tabBarOptions={tabBarOptions}>
          <Tab.Screen name="Home" component={SearchScreen} />
          <Tab.Screen name="Favourites" component={FavouritesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
