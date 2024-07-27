import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {setToStorage} from '../store/store';

import * as clr from '../utils/color';
import {showAlert, width} from '../utils/common';

const Login = () => {
  const [isShowPass, setIsShowPass] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  const handleForgotPassword = () => {
    // TODO: handle forgot password
  };

  const handleSubmit = () => {
    if (username && password) {
      setToStorage('username', username);
      setToStorage('password', password);
      setToStorage('isLogin', true);
    } else {
      showAlert('Notification', 'Please enter username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstLine}>
        <Text style={styles.firstLine.title}>Hello.</Text>
        <Text style={styles.firstLine.title}>Welcome Back</Text>
      </View>
      <View style={styles.inputInfo}>
        <View>
          <Text
            style={styles.inputInfo.title}
            aria-label="Label for title"
            nativeID="title">
            USERNAME
          </Text>
          <TextInput
            style={styles.inputInfo.input}
            placeholder="Enter username..."
            value={username}
            onChangeText={e => setUsername(e)}
            aria-label="input"
            aria-labelledby="username"
          />
        </View>
        <View>
          <Text
            style={styles.inputInfo.title}
            aria-label="Label for title"
            nativeID="title">
            PASSWORD
          </Text>
          <View style={styles.inputInfo.password}>
            <TextInput
              style={styles.inputInfo.input}
              placeholder="Enter password..."
              value={password}
              onChangeText={e => setPassword(e)}
              aria-label="password"
              aria-labelledby="password"
              secureTextEntry={isShowPass ? false : true}
            />
            <Pressable
              style={styles.inputInfo.eye}
              onPress={handleShowPassword}>
              <Image
                style={styles.inputInfo.eye}
                source={
                  isShowPass
                    ? require('../assets/icon_eye_visible.png')
                    : require('../assets/icon_eye_hidden.png')
                }
              />
            </Pressable>
          </View>
        </View>
        <View style={{width: width - 50}}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
          <Pressable style={styles.saveBtn} onPress={handleSubmit}>
            <Text style={styles.text}>LOGIN</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  firstLine: {
    width: width - 50,
    marginBottom: 50,
    title: {
      color: '#555',
      fontSize: 30,
      fontWeight: 'bold',
    },
  },
  inputInfo: {
    flexDirection: 'column',
    gap: 30,
    title: {
      fontWeight: 'bold',
      color: '#8a93a0',
    },
    input: {
      height: 50,
      width: width - 50,
      borderBottomColor: '#bec3ca',
      borderBottomWidth: 1,
      marginBottom: 10,
    },
    password: {
      position: 'relative',
    },
    eye: {
      width: 20,
      height: 20,
      position: 'absolute',
      top: 0,
      right: 0,
      transform: [{translateX: -5}, {translateY: 8}],
      tintColor: '#bec3ca',
      zIndex: 1000,
    },
  },
  forgotPassword: {
    color: clr.primary1,
    textAlign: 'right',
    marginBottom: 40,
  },
  saveBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: clr.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});
