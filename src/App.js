import React from 'react';
import {View, Image} from 'react-native';
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

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: theme.gray}}>
      <NavigationContainer>
        <Provider store={store}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let icon;
                if (route.name === 'Home') {
                  icon = focused ? home_active : home_inactive;
                } else if (route.name === 'Favourites') {
                  icon = focused ? heart_active : heart_inactive;
                }
                // You can return any component that you like here!
                return (
                  <Image source={icon} style={{width: 20, height: 20}} />
                );
              },
            })}
            tabBarOptions={{
              activeTintColor: theme.primary,
              inactiveTintColor: theme.secondary,
              labelStyle: {
                fontSize: 14,
              },
              keyboardHidesTabBar: true,
            }}>
            <Tab.Screen name="Home" component={SearchScreen} />
            <Tab.Screen name="Favourites" component={FavouritesScreen} />
          </Tab.Navigator>
        </Provider>
      </NavigationContainer>
    </View>
  );
}
