/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-view';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {headerOptions, headerOptionsDetail} from './src/utils/common';
import Home from './src/views/Home';
import Login from './src/views/Login';
import {useMMKVBoolean} from 'react-native-mmkv';
import TransactionDetail from './src/components/TransactionDetail';

const Stack = createNativeStackNavigator();

function App() {
  const [isLogin, setIsLogin] = useMMKVBoolean('isLogin');

  useEffect(() => {}, [isLogin]);

  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLogin ? (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                options={headerOptions}
                component={Login}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="HomeScreen"
                component={Home}
                options={headerOptions}
              />
              <Stack.Screen
                name="Transaction"
                component={TransactionDetail}
                options={headerOptionsDetail}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e2e4e8',
    fontFamily: 'poppins',
  },
});

export default App;
