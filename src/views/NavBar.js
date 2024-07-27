import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import * as color from '../utils/color';
import {useMMKVString} from 'react-native-mmkv';

const NavBar = () => {
  const [name, setName] = useMMKVString('username');

  const onPressAccount = () => {};

  const onPressNoti = () => {};

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor={color.primary} />
      <Pressable style={styles.navBar} onPress={onPressAccount}>
        <View style={styles.navBar.imgWraper}>
          <Image
            style={styles.navBar.image}
            source={{uri: 'https://source.unsplash.com/random'}}
          />
        </View>
        <View>
          <Text style={styles.navBar.name}>Hey, {name ?? '-'}</Text>
          <Text style={styles.navBar.txt}>Welcome Back</Text>
        </View>
      </Pressable>
      <Pressable style={styles.navBar.bell} onPress={onPressNoti}>
        <Image
          style={styles.navBar.bell.iconBell}
          source={require('../assets/icon_bell.png')}
        />
        <View style={styles.navBar.bell.bage} />
      </Pressable>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    padding: 15,
    backgroundColor: color.primary,
    borderBottomColor: color.primary1,
    borderBottomWidth: 1,
  },
  navBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    imgWraper: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 100,
    },
    image: {
      borderRadius: 100,
      width: 35,
      height: 35,
    },
    txt: {
      color: color.txtLightGrey,
    },
    name: {
      color: color.txtWhite,
      fontWeight: 'bold',
    },
    bell: {
      width: 20,
      height: 20,
      position: 'relative',
      marginLeft: 'auto',
      iconBell: {
        width: 20,
        height: 20,
        tintColor: color.secondary,
      },
      bage: {
        width: 8,
        height: 8,
        borderRadius: 100,
        backgroundColor: color.err,
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
});
