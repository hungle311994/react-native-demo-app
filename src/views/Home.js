/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View} from 'react-native';

import * as clr from '../utils/color';

import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Account from './Account';
import ImportantSpending from './ImportantSpending';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <>
      {/* Nav Bar */}
      <NavBar />

      {/* Bottom Tab */}
      <Tab.Navigator>
        <Tab.Screen
          name="Spending"
          options={{
            tabBarLabel: () => null,
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? clr.primary : clr.lightGrey,
                }}
                source={require('../assets/icon_home.png')}
              />
            ),
          }}
          children={() => <Dashboard />}
        />
        <Tab.Screen
          name="Important spending"
          options={{
            tabBarLabel: () => null,
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <Image
                style={{
                  height: size,
                  width: size,
                  tintColor: focused ? clr.primary : clr.lightGrey,
                }}
                source={require('../assets/icon_wallet.png')}
              />
            ),
          }}
          children={() => <ImportantSpending />}
        />
        <Tab.Screen
          name="Account"
          options={{
            tabBarLabel: () => null,
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => (
              <View style={{position: 'relative', width: size, height: size}}>
                <Image
                  style={{
                    height: size,
                    width: size,
                    tintColor: focused ? clr.primary : clr.lightGrey,
                  }}
                  source={require('../assets/icon_account.png')}
                />
              </View>
            ),
          }}
          children={() => <Account />}
        />
      </Tab.Navigator>
    </>
  );
};

export default Home;
