import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {height, width} from '../utils/common';
import * as clr from '../utils/color';

const Loading = ({position}) => {
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      transform: [{translateX: -10}, {translateY: position}],
      zIndex: -1,
    },
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={clr.primary}
        style={styles.loading}
      />
    </View>
  );
};

export const showLoading = setIsLoading => {
  setIsLoading(true);
};

export const hideLoading = setIsLoading => {
  setTimeout(() => {
    setIsLoading(false);
  }, 500);
};

export default Loading;
