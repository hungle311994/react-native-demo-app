/* eslint-disable react-native/no-inline-styles */
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {setToStorage} from '../store/store';

const DrawerContent = () => {
  return (
    <View>
      <Pressable
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1f84e4',
          marginVertical: 10,
          padding: 7,
        }}
        onPress={() => {
          setToStorage('isLogin', false);
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: '#fff',
          }}
          source={require('../assets/icon_logout.png')}
        />
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
          }}>
          Logout
        </Text>
      </Pressable>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
