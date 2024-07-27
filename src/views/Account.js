import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {setToStorage} from '../store/store';
import {useMMKVString} from 'react-native-mmkv';

import * as clr from '../utils/color';
import Toast from 'react-native-toast-message';

const Account = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useMMKVString('username');
  const [phone, setPhone] = useMMKVString('phone');
  const [address, setAddress] = useMMKVString('address');

  const handleEditAccount = () => {
    setIsEdit(!isEdit);
    if (isEdit === true) {
      setToStorage('username', name);
      setToStorage('phone', phone);
      setToStorage('address', address);
      Toast.show({
        type: 'success',
        text1: 'Edit account successfully',
      });
    }
  };

  useEffect(() => {}, [name, phone, address]);

  return (
    <View style={styles.container}>
      <Pressable onPress={handleEditAccount} style={styles.editBtnWrap}>
        <Image
          style={styles.editBtn}
          source={
            isEdit
              ? require('../assets/icon_download.png')
              : require('../assets/icon_pencil.png')
          }
        />
      </Pressable>
      <View style={styles.info}>
        <Text aria-label="Label for name" nativeID="name">
          Name:
        </Text>
        {isEdit ? (
          <TextInput
            style={styles.input}
            placeholder="Enter name..."
            value={name}
            onChangeText={e => setName(e)}
            aria-label="number"
            aria-labelledby="name"
          />
        ) : (
          <Text>{name ?? '-'}</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text aria-label="Label for phone" nativeID="phone">
          Phone:
        </Text>
        {isEdit ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter phone..."
            value={phone}
            onChangeText={e => setPhone(e)}
            aria-label="number"
            aria-labelledby="phone"
          />
        ) : (
          <Text>{phone ?? '-'}</Text>
        )}
      </View>
      <View style={styles.info}>
        <Text aria-label="Label for address" nativeID="address">
          Address:
        </Text>
        {isEdit ? (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter address..."
            value={address}
            onChangeText={e => setAddress(e)}
            aria-labelledby="address"
          />
        ) : (
          <Text>{address ?? '-'}</Text>
        )}
      </View>
      <Pressable
        style={styles.logoutBtn}
        onPress={() => {
          setToStorage('isLogin', false);
        }}>
        <Image
          style={styles.iconLogout}
          source={require('../assets/icon_logout.png')}
        />
        <Text style={styles.txt}>Logout</Text>
      </Pressable>
      <Toast position="bottom" />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  editBtnWrap: {
    width: 40,
    height: 40,
    borderRadius: 7,
    backgroundColor: clr.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 'auto',
  },
  editBtn: {
    width: 20,
    height: 20,
    tintColor: clr.txtWhite,
  },
  info: {
    borderRadius: 7,
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: clr.txtLightestGrey,
    borderRadius: 7,
    padding: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: clr.primary1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 7,
  },
  iconLogout: {
    width: 25,
    height: 25,
    tintColor: clr.txtWhite,
  },
  txt: {
    fontSize: 16,
    color: clr.txtWhite,
  },
});
